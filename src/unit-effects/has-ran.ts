import { IUnit, UnitCategoryId } from "@lob-sdk/types";
import { BaseUnitEffect } from "./base-unit-effect";
import { UnitEffectRegistry } from "./unit-effect-registry";
import { UnitEffectDisplayStat } from "./types";

/**
 * Effect applied when a unit has been running.
 * Used to track recent running movement and affects various unit behaviors.
 */
export class HasRan extends BaseUnitEffect {
  static readonly id = 3;
  static readonly name = "has_ran";

  private static readonly _chargeResistanceModifierByCategory: Record<
    UnitCategoryId,
    number
  > = {
    infantry: -1.5,
    artillery: -0.75,
    militiaInfantry: -0.8,
  };

  onTickStart(unit: IUnit): void {
    unit.chargeResistanceModifier +=
      HasRan._chargeResistanceModifierByCategory[unit.category];
  }

  getDisplayStats(unit: IUnit): UnitEffectDisplayStat[] {
    return [
      {
        label: "unitStat.chargeResistance",
        type: "percentage",
        signed: true,
        value: HasRan._chargeResistanceModifierByCategory[unit.category],
      },
      {
        label: "removesX",
        type: "text",
        value: "unitEffect.beenInMelee",
      },
    ];
  }
}

// Auto-register when module is loaded
UnitEffectRegistry.register(HasRan);
