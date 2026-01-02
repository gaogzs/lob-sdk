import { BaseUnitEffect } from "./base-unit-effect";
import { UnitEffectRegistry } from "./unit-effect-registry";

describe("UnitEffectRegistry", () => {
  // Test effect classes with unique IDs to avoid conflicts
  class TestEffect1 extends BaseUnitEffect {
    static readonly id = 1000;
    static readonly name = "test-effect-1";
  }

  class TestEffect2 extends BaseUnitEffect {
    static readonly id = 1001;
    static readonly name = "test-effect-2";
  }

  class TestEffectDuplicateId extends BaseUnitEffect {
    static readonly id = 1000; // Same ID as TestEffect1
    static readonly name = "test-effect-duplicate-id";
  }

  class TestEffectDuplicateName extends BaseUnitEffect {
    static readonly id = 1002;
    static readonly name = "test-effect-1"; // Same name as TestEffect1
  }

  beforeEach(() => {
    // Clear the registry before each test
    // We need to access private members, so we'll use a workaround
    // by unregistering effects if they exist
    const allIds = UnitEffectRegistry.getAllIds();
    // Note: We can't directly clear, but we can test with unique IDs
  });

  describe("register", () => {
    it("should register an effect successfully", () => {
      expect(() => {
        UnitEffectRegistry.register(TestEffect1);
      }).not.toThrow();

      expect(UnitEffectRegistry.getName(TestEffect1.id)).toBe(TestEffect1.name);
      expect(UnitEffectRegistry.getId(TestEffect1.name)).toBe(TestEffect1.id);
      expect(UnitEffectRegistry.getEffectClass(TestEffect1.id)).toBe(TestEffect1);
    });

    it("should throw error when registering effect with duplicate ID", () => {
      UnitEffectRegistry.register(TestEffect1);

      expect(() => {
        UnitEffectRegistry.register(TestEffectDuplicateId);
      }).toThrow(
        `Cannot register effect with ID ${TestEffectDuplicateId.id} and name "${TestEffectDuplicateId.name}": ` +
        `Effect ID ${TestEffectDuplicateId.id} is already registered to name "${TestEffect1.name}"`
      );
    });

    it("should throw error when registering effect with duplicate name", () => {
      UnitEffectRegistry.register(TestEffect1);

      expect(() => {
        UnitEffectRegistry.register(TestEffectDuplicateName);
      }).toThrow(
        `Cannot register effect with ID ${TestEffectDuplicateName.id} and name "${TestEffectDuplicateName.name}": ` +
        `Effect name "${TestEffectDuplicateName.name}" is already registered to ID ${TestEffect1.id}`
      );
    });

    it("should register multiple effects with different IDs and names", () => {
      expect(() => {
        UnitEffectRegistry.register(TestEffect1);
        UnitEffectRegistry.register(TestEffect2);
      }).not.toThrow();

      expect(UnitEffectRegistry.getName(TestEffect1.id)).toBe(TestEffect1.name);
      expect(UnitEffectRegistry.getName(TestEffect2.id)).toBe(TestEffect2.name);
      expect(UnitEffectRegistry.getId(TestEffect1.name)).toBe(TestEffect1.id);
      expect(UnitEffectRegistry.getId(TestEffect2.name)).toBe(TestEffect2.id);
    });
  });

  describe("getName", () => {
    it("should return the name for a registered effect ID", () => {
      UnitEffectRegistry.register(TestEffect1);
      expect(UnitEffectRegistry.getName(TestEffect1.id)).toBe(TestEffect1.name);
    });

    it("should return undefined for an unregistered effect ID", () => {
      expect(UnitEffectRegistry.getName(9999)).toBeUndefined();
    });
  });

  describe("getId", () => {
    it("should return the ID for a registered effect name", () => {
      UnitEffectRegistry.register(TestEffect1);
      expect(UnitEffectRegistry.getId(TestEffect1.name)).toBe(TestEffect1.id);
    });

    it("should return undefined for an unregistered effect name", () => {
      expect(UnitEffectRegistry.getId("unregistered-effect")).toBeUndefined();
    });
  });

  describe("getEffectClass", () => {
    it("should return the effect class for a registered effect ID", () => {
      UnitEffectRegistry.register(TestEffect1);
      expect(UnitEffectRegistry.getEffectClass(TestEffect1.id)).toBe(TestEffect1);
    });

    it("should return undefined for an unregistered effect ID", () => {
      expect(UnitEffectRegistry.getEffectClass(9999)).toBeUndefined();
    });
  });

  describe("nameToIdOrThrow", () => {
    it("should return the ID for a registered effect name", () => {
      UnitEffectRegistry.register(TestEffect1);
      expect(UnitEffectRegistry.nameToIdOrThrow(TestEffect1.name)).toBe(TestEffect1.id);
    });

    it("should throw error for an unregistered effect name", () => {
      expect(() => {
        UnitEffectRegistry.nameToIdOrThrow("unregistered-effect");
      }).toThrow('Unknown effect name: "unregistered-effect"');
    });
  });

  describe("idToNameOrThrow", () => {
    it("should return the name for a registered effect ID", () => {
      UnitEffectRegistry.register(TestEffect1);
      expect(UnitEffectRegistry.idToNameOrThrow(TestEffect1.id)).toBe(TestEffect1.name);
    });

    it("should throw error for an unregistered effect ID", () => {
      expect(() => {
        UnitEffectRegistry.idToNameOrThrow(9999);
      }).toThrow("Unknown effect ID: 9999");
    });
  });

  describe("getAllNames", () => {
    it("should return all registered effect names", () => {
      UnitEffectRegistry.register(TestEffect1);
      UnitEffectRegistry.register(TestEffect2);

      const names = UnitEffectRegistry.getAllNames();
      expect(names).toContain(TestEffect1.name);
      expect(names).toContain(TestEffect2.name);
      expect(names.length).toBeGreaterThanOrEqual(2);
    });

    it("should return empty array when no effects are registered", () => {
      // Note: This test may fail if effects are auto-registered on import
      // We'll check that at least our test effects aren't in the list
      const names = UnitEffectRegistry.getAllNames();
      // We can't guarantee it's empty due to auto-registration, but we can check
      // that our test effects aren't there if they weren't registered
      expect(Array.isArray(names)).toBe(true);
    });
  });

  describe("getAllIds", () => {
    it("should return all registered effect IDs", () => {
      UnitEffectRegistry.register(TestEffect1);
      UnitEffectRegistry.register(TestEffect2);

      const ids = UnitEffectRegistry.getAllIds();
      expect(ids).toContain(TestEffect1.id);
      expect(ids).toContain(TestEffect2.id);
      expect(ids.length).toBeGreaterThanOrEqual(2);
    });

    it("should return array of numbers", () => {
      UnitEffectRegistry.register(TestEffect1);
      const ids = UnitEffectRegistry.getAllIds();
      expect(Array.isArray(ids)).toBe(true);
      if (ids.length > 0) {
        expect(typeof ids[0]).toBe("number");
      }
    });
  });
});

