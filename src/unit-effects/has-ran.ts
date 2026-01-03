import { IUnit, UnitCategoryId } from "@lob-sdk/types";
import { BaseUnitEffect } from "./base-unit-effect";
import { UnitEffectRegistry } from "./unit-effect-registry";
import { UnitEffectDisplayStat } from "./types";
import { RangedDamageTypeTemplate } from "@lob-sdk/game-data-manager";

/**
 * Effect applied when a unit has been running.
 * Used to track recent running movement and affects various unit behaviors.
 *
 * @NOTE
 * This effect is especial and integrated with the engine.
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

  private static readonly _meleeStaminaCostModifier = 1.0;

  onTickStart(unit: IUnit): void {
    unit.chargeResistanceModifier +=
      HasRan._chargeResistanceModifierByCategory[unit.category];
    unit.meleeStaminaCostModifier += HasRan._meleeStaminaCostModifier;
  }

  getDisplayStats(unit: IUnit): UnitEffectDisplayStat[] {
    const chargeResistanceModifier = HasRan.getChargeResistanceModifier(unit);

    return [
      {
        label: "unitStat.chargeResistance",
        type: "percentage",
        signed: true,
        value: chargeResistanceModifier,
        color: chargeResistanceModifier > 0 ? "red" : "green",
      },
      {
        label: "meleeStaminaCost",
        type: "percentage",
        signed: true,
        value: HasRan._meleeStaminaCostModifier,
        color: HasRan._meleeStaminaCostModifier > 0 ? "red" : "green",
      },
    ];
  }

  static getChargeResistanceModifier(unit: IUnit): number {
    return HasRan._chargeResistanceModifierByCategory[unit.category];
  }

  /**
   * Blocks ranged damage types that have cannotUseAfterRun set to true.
   * This is checked for each damage type individually, avoiding unnecessary iterations.
   */
  isRangedDamageTypeBlocked(
    unit: IUnit,
    template: RangedDamageTypeTemplate
  ): boolean {
    return template.cannotUseAfterRun === true;
  }
}

// Auto-register when module is loaded
UnitEffectRegistry.register(HasRan);
