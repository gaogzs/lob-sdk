import { IUnit, UnitEffectDto } from "@lob-sdk/types";
import { BaseUnitEffect } from "./base-unit-effect";
import { UnitEffectRegistry } from "./unit-effect-registry";
import { UnitEffectDisplayStat } from "./types";

/**
 * Effect applied when a unit has been in melee combat.
 * Used to track recent melee engagement status.
 */
export class BeenInMelee extends BaseUnitEffect {
  static readonly id = 2;
  static readonly name = "been_in_melee";
  reorgDebuff: number;

  constructor(duration: number, reorgDebuff: number) {
    super(duration);
    this.reorgDebuff = reorgDebuff;
  }

  onAdded(unit: IUnit): void {
    unit.cannotChangeFormation = true;
    unit.cannotCharge = true;
    unit.reorgDebuff = Math.max(unit.reorgDebuff, this.reorgDebuff);
  }

  onTickStart(unit: IUnit): void {
    unit.cannotChangeFormation = true;
    unit.cannotCharge = true;
    unit.reorgDebuff = Math.max(unit.reorgDebuff, this.reorgDebuff);
  }

  merge(other: BeenInMelee): void {
    // Prioritize effects with more reorg debuff
    if (other.reorgDebuff >= this.reorgDebuff) {
      this.duration = other.duration;
      this.reorgDebuff = other.reorgDebuff;
    }
  }

  toDto(): UnitEffectDto {
    return [this.id, this.duration, this.reorgDebuff];
  }

  getDisplayStats(unit: IUnit): UnitEffectDisplayStat[] {
    return [
      {
        label: "cannotChangeFormation",
        type: "text",
        color: "red",
      },
      {
        label: "cannotCharge",
        type: "text",
        color: "red",
      },
      {
        label: "cannotRecoverOrg",
        type: "text",
        color: "red",
      },
      {
        label: "reorgDebuff",
        value: unit.reorgDebuff,
        type: "percentage",
        signed: true,
        color: unit.reorgDebuff > 0 ? "red" : "green",
      },
    ];
  }
}

// Auto-register when module is loaded
UnitEffectRegistry.register(BeenInMelee);
