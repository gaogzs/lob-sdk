import { GameDataManager, IUnit } from "..";
import { BaseUnitEffect } from "./base-unit-effect";
import { UnitEffectDisplayStat } from "./types";
import { UnitEffectRegistry } from "./unit-effect-registry";

/**
 * Effect applied when a unit has started routing.
 * Used to track units that have recently begun routing and affects recovery behavior.
 */
export class StartedRouting extends BaseUnitEffect {
  static readonly id = 4;
  static readonly name = "started_routing";

  private static readonly _startedRoutingOrgRadiusModifier = -4;

  onTickStart(unit: IUnit): void {
    unit.orgRadiusBonusModifier =
      StartedRouting._startedRoutingOrgRadiusModifier;
  }

  merge(other: StartedRouting): void {
    if (other.duration > this.duration) {
      this.duration = other.duration;
    }
  }

  getDisplayStats(unit: IUnit): UnitEffectDisplayStat[] {
    return [
      {
        label: "orgRadiusBonus",
        type: "percentage",
        value: StartedRouting._startedRoutingOrgRadiusModifier,
      },
    ];
  }
}

// Auto-register when module is loaded
UnitEffectRegistry.register(StartedRouting);
