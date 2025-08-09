const entityService = require("../../src/services/entityService");

// Mock the repository
jest.mock("../../src/repositories/entityRepository");

describe("EntityService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    test("should create entity successfully", async () => {
      const mockEntity = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Test Entity",
        description: "Test Description",
        status: "active"
      };

      entityService.entityRepository.create = jest.fn().mockResolvedValue(mockEntity);

      const result = await entityService.create({
        name: "Test Entity",
        description: "Test Description"
      });

      expect(result).toEqual(mockEntity);
      expect(entityService.entityRepository.create).toHaveBeenCalledWith({
        name: "Test Entity",
        description: "Test Description"
      });
    });
  });

  describe("getById", () => {
    test("should return entity when found", async () => {
      const mockEntity = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Test Entity"
      };

      entityService.entityRepository.findById = jest.fn().mockResolvedValue(mockEntity);

      const result = await entityService.getById("123e4567-e89b-12d3-a456-426614174000");

      expect(result).toEqual(mockEntity);
    });

    test("should return null when entity not found", async () => {
      entityService.entityRepository.findById = jest.fn().mockResolvedValue(null);

      const result = await entityService.getById("nonexistent-id");

      expect(result).toBeNull();
    });
  });
});
