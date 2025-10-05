import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Project = sequelize.define("Project", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  base_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: "projects",
  timestamps: true,
});

export default Project;