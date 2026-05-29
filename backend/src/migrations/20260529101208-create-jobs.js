'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jobs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      company: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      company_logo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      requirements: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      responsibilities: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      category: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      job_type: {
        type: Sequelize.ENUM(
          'full-time', 'part-time', 'contract',
          'freelance', 'internship', 'remote'
        ),
        allowNull: false
      },
      experience_level: {
        type: Sequelize.ENUM(
          'entry', 'junior', 'mid', 'senior', 'lead', 'executive'
        ),
        allowNull: false
      },
      location: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      is_remote: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      salary_min: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      salary_max: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      salary_currency: {
        type: Sequelize.STRING(10),
        defaultValue: 'USD'
      },
      skills: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      benefits: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'closed'),
        defaultValue: 'active'
      },
      deadline: {
        type: Sequelize.DATE,
        allowNull: true
      },
      openings: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      views_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      applications_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      is_featured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      admin_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });

    await queryInterface.addIndex('jobs', ['status']);
    await queryInterface.addIndex('jobs', ['category']);
    await queryInterface.addIndex('jobs', ['experience_level']);
    await queryInterface.addIndex('jobs', ['admin_id']);
    await queryInterface.addIndex('jobs', ['is_featured']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('jobs');
  }
};