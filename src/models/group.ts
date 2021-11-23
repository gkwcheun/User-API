"use strict";
import { Model } from "sequelize";
import { GroupAttributes } from "../interfaces/interfaces";

module.exports = (sequelize: any, DataTypes: any) => {
  class Group extends Model<GroupAttributes> implements GroupAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    name!: string;
    permissions!: string[];

    static associate(models: any) {
      // define association here
      this.belongsToMany(models.User, { through: models.UserGroup });
    }
  }
  Group.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "groups",
      modelName: "Group",
    }
  );
  return Group;
};
