'use strict';

module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    job_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    cover_letter: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    resume_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM(
        'pending', 'reviewing', 'shortlisted', 'rejected', 'accepted'
      ),
      defaultValue: 'pending'
    },
    expected_salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    years_of_experience: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'applications',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Application;
};