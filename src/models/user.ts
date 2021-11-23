"use strict";
import { Model } from "sequelize";
import { UserAttributes } from "../interfaces/interfaces";

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    login!: string;
    password!: string;
    age!: number;
    isDeleted!: boolean;
    static associate({ Group, UserGroup }: { Group: any; UserGroup: any }) {
      // define association here
      this.belongsToMany(Group, { through: UserGroup });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      login: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      age: { type: DataTypes.INTEGER, allowNull: false },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: "deleted",
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
      createdAt: false,
      updatedAt: false,
    }
  );
  return User;
};
