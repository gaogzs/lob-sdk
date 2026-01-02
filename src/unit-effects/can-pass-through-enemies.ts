import { BaseUnitEffect } from "./base-unit-effect";
import { UnitEffectRegistry } from "./unit-effect-registry";

/**
 * Effect that allows a unit to pass through enemy units.
 * When active, the unit's enemy collision level is set to minimum,
 * preventing it from getting trapped by enemy units.
 * This is useful for units in dispersed formation to avoid encirclement.
 */
export class CanPassThroughEnemies extends BaseUnitEffect {
  static readonly id = 7;
  static readonly name = "can_pass_through_enemies";
}

// Auto-register when module is loaded
UnitEffectRegistry.register(CanPassThroughEnemies);

