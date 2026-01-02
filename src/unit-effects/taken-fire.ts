import { IUnit, UnitEffectDto } from "@lob-sdk/types";
import { BaseUnitEffect } from "./base-unit-effect";
import { UnitEffectRegistry } from "./unit-effect-registry";

/**
 * Effect applied when a unit has taken fire from enemies.
 * Affects charge resistance and other combat behaviors.
 */
export class TakenFire extends BaseUnitEffect {
  static readonly id = 5;
  static readonly name = "taken-fire";

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
}

// Auto-register when module is loaded
UnitEffectRegistry.register(TakenFire);
