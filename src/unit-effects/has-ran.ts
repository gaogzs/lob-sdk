import { BaseUnitEffect } from "./base-unit-effect";
import { UnitEffectRegistry } from "./unit-effect-registry";

/**
 * Effect applied when a unit has been running.
 * Used to track recent running movement and affects various unit behaviors.
 */
export class HasRan extends BaseUnitEffect {
  static readonly id = 3;
  static readonly name = "has-ran";
}

// Auto-register when module is loaded
UnitEffectRegistry.register(HasRan);
