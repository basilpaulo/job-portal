'use strict';

module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Job title is required' },
        len: { args: [3, 200], msg: 'Title must be between 3-200 characters' }
      }
    },
    company: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Company name is required' }
      }
    },
    company_logo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Job description is required' },
        len: { args: [50], msg: 'Description must be at least 50 characters' }
      }
    },
    requirements: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Job requirements are required' }
      }
    },
    responsibilities: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Category is required' }
      }
    },
    job_type: {
      type: DataTypes.ENUM(
        'full-time', 'part-time', 'contract',
        'freelance', 'internship', 'remote'
      ),
      allowNull: false
    },
    experience_level: {
      type: DataTypes.ENUM(
        'entry', 'junior', 'mid', 'senior', 'lead', 'executive'
      ),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Location is required' }
      }
    },
    is_remote: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    salary_min: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        min: { args: [0], msg: 'Minimum salary cannot be negative' }
      }
    },
    salary_max: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    salary_currency: {
      type: DataTypes.STRING(10),
      defaultValue: 'USD'
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    benefits: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'closed'),
      defaultValue: 'active'
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true
    },
    openings: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: { args: [1], msg: 'Must have at least 1 opening' }
      }
    },
    views_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    applications_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    admin_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    tableName: 'jobs',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Job;
};