import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const ProjectCategory = sequelize.define(
  'ProjectCategory',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'project_categories',
    underscored: true,
  }
);

export default ProjectCategory;