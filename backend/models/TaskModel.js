import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";

const Task = db.define("tasks", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  title: DataTypes.STRING,
  completed: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  timestamps: false
});

Task.belongsTo(User, { foreignKey: "userId" });
export default Task;
