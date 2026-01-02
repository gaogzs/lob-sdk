import { BaseUnitEffect } from "./base-unit-effect";
import { Rotated180 } from "./rotated-180";
import { BeenInMelee } from "./been-in-melee";
import { HasRan, StartedRouting, TakenFire, HasFired, CanPassThroughEnemies } from "./index";
import { UnitEffectDto } from "@lob-sdk/types";
import { UnitEffectRegistry } from "./unit-effect-registry";

type EffectFactory = (dto: UnitEffectDto) => BaseUnitEffect;

/**
 * Factory class for creating unit effect instances.
 * Provides a centralized way to create effect objects from numeric IDs.
 * Uses a Map for O(1) lookup performance instead of switch statement.
 * The Map is lazily initialized on first use to save memory.
 */
export class UnitEffectFactory {
  private static _factories: Map<number, EffectFactory> | null = null;

  private static _getFactories(): Map<number, EffectFactory> {
    if (!this._factories) {
      this._factories = new Map([
        [Rotated180.id, (dto) => new Rotated180(dto[1])],
        [BeenInMelee.id, (dto) => new BeenInMelee(dto[1], dto[2])],
        [HasRan.id, (dto) => new HasRan(dto[1])],
        [StartedRouting.id, (dto) => new StartedRouting(dto[1])],
        [TakenFire.id, (dto) => new TakenFire(dto[1], dto[2])],
        [HasFired.id, (dto) => new HasFired(dto[1])],
        [CanPassThroughEnemies.id, (dto) => new CanPassThroughEnemies(dto[1])],
      ]);
    }
    return this._factories;
  }

  static create(dto: UnitEffectDto): BaseUnitEffect {
    const effectId = dto[0];
    
    // First try the static factory map (core effects)
    const factory = this._getFactories().get(effectId);
    if (factory) {
      return factory(dto);
    }
    
    // If not found, try the registry (for mod effects)
    const effectClass = UnitEffectRegistry.getEffectClass(effectId);
    if (effectClass) {
      // For simple effects, assume only duration is needed
      // Mods with complex effects should register their own factory
      return new (effectClass as any)(dto[1], ...dto.slice(2));
    }
    
    throw new Error(`Unknown unit effect: ${effectId}`);
  }
}
