import { IUnit } from "..";
import { BaseUnitEffect } from "./base-unit-effect";
import { UnitEffectDisplayStat } from "./types";
import { UnitEffectRegistry } from "./unit-effect-registry";

/**
 * Effect that causes a unit to fully stop when rotating 180 degrees.
 * Duration is typically set to the unit's turningDelay property.
 *
 * @NOTE
 * This effect is especial and integrated with the engine.
 */
export class Rotated180 extends BaseUnitEffect {
  static readonly id = 1;
  static readonly name = "rotated_180";

  getDisplayStats(unit: IUnit): UnitEffectDisplayStat[] {
    return [
      {
        label: "cannotMove",
        type: "text",
        color: "red",
      },
    ];
  }
}

// Auto-register when module is loaded
UnitEffectRegistry.register(Rotated180);
