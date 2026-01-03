import { IUnit } from "@lob-sdk/types";
import { BaseUnitEffect } from "./base-unit-effect";
import { UnitEffectRegistry } from "./unit-effect-registry";
import { NO_COLLISION_LEVEL } from "@lob-sdk/constants";
import { UnitEffectDisplayStat } from "./types";

/**
 * Effect that allows a unit to pass through enemy units.
 * When active, the unit's enemy collision level is set to minimum,
 * preventing it from getting trapped by enemy units.
 * This is useful for units in dispersed formation to avoid encirclement.
 */
export class CanPassThroughEnemies extends BaseUnitEffect {
  static readonly id = 7;
  static readonly name = "can_pass_through_enemies";

  onTickStart(unit: IUnit): void {
    unit.fixedEnemyCollisionLevel = NO_COLLISION_LEVEL;
  }

  getDisplayStats(unit: IUnit): UnitEffectDisplayStat[] {
    return [
      {
        label: "cannotCollideWithEnemies",
        type: "text",
        color: "green",
      },
    ];
  }
}

// Auto-register when module is loaded
UnitEffectRegistry.register(CanPassThroughEnemies);
