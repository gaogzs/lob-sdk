import { BaseUnitEffect } from "./base-unit-effect";
import { UnitEffectRegistry } from "./unit-effect-registry";

/**
 * Effect applied when a unit has started routing.
 * Used to track units that have recently begun routing and affects recovery behavior.
 */
export class StartedRouting extends BaseUnitEffect {
  static readonly id = 4;
  static readonly name = "started_routing";

  merge(other: StartedRouting): void {
    if (other.duration > this.duration) {
      this.duration = other.duration;
    }
  }
}

// Auto-register when module is loaded
UnitEffectRegistry.register(StartedRouting);
