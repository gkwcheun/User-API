"use strict";
import { Model } from "sequelize";
module.exports = (sequelize: any, DataTypes: any) => {
  class UserGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  UserGroup.init(
    {},
    {
      sequelize,
      tableName: "user_groups",
      modelName: "UserGroup",
      createdAt: false,
      updatedAt: false,
    }
  );
  return UserGroup;
};
