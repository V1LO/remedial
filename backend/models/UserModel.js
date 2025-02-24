import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const User = db.define("users", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
}, {
  timestamps: false
});

export default User;
