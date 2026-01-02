import { BaseUnitEffect } from "./base-unit-effect";
import { UnitEffectRegistry } from "./unit-effect-registry";

/**
 * Effect that causes a unit to fully stop when rotating 180 degrees.
 * Duration is typically set to the unit's turningDelay property.
 */
export class Rotated180 extends BaseUnitEffect {
  static readonly id = 1;
  static readonly name = "rotated_180";
}

// Auto-register when module is loaded
UnitEffectRegistry.register(Rotated180);
