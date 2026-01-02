import { BaseUnitEffect } from "./base-unit-effect";
import { UnitEffectRegistry } from "./unit-effect-registry";

/**
 * Effect applied when a unit has fired its weapons.
 * Used to track recent firing activity and affects unit behavior.
 */
export class HasFired extends BaseUnitEffect {
  static readonly id = 6;
  static readonly name = "has-fired";
}

// Auto-register when module is loaded
UnitEffectRegistry.register(HasFired);
