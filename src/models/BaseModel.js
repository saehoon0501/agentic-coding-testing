const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const BaseModel = sequelize.define("BaseModel", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  paranoid: true, // Enable soft deletes
  timestamps: true,
  tableName: "base_models"
});

// Instance methods
BaseModel.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  delete values.deletedAt;
  return values;
};

module.exports = BaseModel;
