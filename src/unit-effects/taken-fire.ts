import { IUnit, UnitEffectDto } from "@lob-sdk/types";
import { BaseUnitEffect } from "./base-unit-effect";
import { UnitEffectRegistry } from "./unit-effect-registry";
import { UnitEffectDisplayStat } from "./types";

/**
 * Effect applied when a unit has taken fire from enemies.
 * Affects charge resistance and other combat behaviors.
 */
export class TakenFire extends BaseUnitEffect {
  static readonly id = 5;
  static readonly name = "taken_fire";

  private static readonly _movementModifier = -0.1;
  private static readonly _baseMovementModifier = -0.12;

  reorgDebuff: number;

  constructor(duration: number, reorgDebuff: number) {
    super(duration);
    this.reorgDebuff = reorgDebuff;
  }

  onAdded(unit: IUnit): void {
    unit.reorgDebuff = Math.max(unit.reorgDebuff, this.reorgDebuff);
  }

  onTickStart(unit: IUnit): void {
    unit.reorgDebuff = Math.max(unit.reorgDebuff, this.reorgDebuff);
    unit.movementModifier += TakenFire._movementModifier;
    unit.baseMovementModifier += TakenFire._baseMovementModifier;
  }

  merge(other: TakenFire): void {
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
        label: "movement",
        type: "percentage",
        value: TakenFire._movementModifier,
        color: TakenFire._movementModifier < 0 ? "red" : "green",
      },
      {
        label: "baseMovement",
        type: "percentage",
        value: TakenFire._baseMovementModifier,
        color: TakenFire._baseMovementModifier < 0 ? "red" : "green",
      },
      {
        label: "reorgDebuff",
        type: "percentage",
        signed: true,
        value: unit.reorgDebuff,
        color: unit.reorgDebuff > 0 ? "red" : "green",
      },
    ];
  }
}

// Auto-register when module is loaded
UnitEffectRegistry.register(TakenFire);
