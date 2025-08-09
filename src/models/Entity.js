const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Entity = sequelize.define("Entity", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 255]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM("active", "inactive", "pending"),
    defaultValue: "active"
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "entities",
  timestamps: true,
  indexes: [
    { fields: ["name"] },
    { fields: ["status"] },
    { fields: ["createdAt"] }
  ]
});

module.exports = Entity;
