const EntityService = require("../../src/services/EntityService");
const EntityRepository = require("../../src/repositories/EntityRepository");

// Mock the repository
jest.mock("../../src/repositories/EntityRepository");

describe("EntityService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createEntity", () => {
    test("should create entity successfully", async () => {
      const entityData = {
        name: "Test Entity",
        description: "Test Description",
        status: "active"
      };

      EntityRepository.findByName.mockResolvedValue(null);
      EntityRepository.create.mockResolvedValue({ id: "123", ...entityData });

      const result = await EntityService.createEntity(entityData);

      expect(EntityRepository.findByName).toHaveBeenCalledWith(entityData.name);
      expect(EntityRepository.create).toHaveBeenCalledWith(entityData);
      expect(result).toEqual({ id: "123", ...entityData });
    });

    test("should throw error if entity with same name exists", async () => {
      const entityData = {
        name: "Existing Entity",
        description: "Test Description"
      };

      EntityRepository.findByName.mockResolvedValue({ id: "existing" });

      await expect(EntityService.createEntity(entityData))
        .rejects
        .toThrow("Entity with this name already exists");
    });
  });

  describe("getEntityById", () => {
    test("should return entity if found", async () => {
      const entityId = "123";
      const mockEntity = { id: entityId, name: "Test Entity" };

      EntityRepository.findById.mockResolvedValue(mockEntity);

      const result = await EntityService.getEntityById(entityId);

      expect(EntityRepository.findById).toHaveBeenCalledWith(entityId);
      expect(result).toEqual(mockEntity);
    });

    test("should throw error if entity not found", async () => {
      const entityId = "nonexistent";

      EntityRepository.findById.mockResolvedValue(null);

      await expect(EntityService.getEntityById(entityId))
        .rejects
        .toThrow("Entity not found");
    });
  });
});
