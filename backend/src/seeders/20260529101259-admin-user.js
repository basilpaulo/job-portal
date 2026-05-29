'use strict';
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('Admin@123', 12);
    const adminId = uuidv4();
    const userId = uuidv4();
    const userId2 = uuidv4();

    await queryInterface.bulkInsert('users', [
      {
        id: adminId,
        name: 'Super Admin',
        email: 'admin@jobportal.com',
        password: hashedPassword,
        role: 'admin',
        phone: '+1234567890',
        location: 'New York, USA',
        bio: 'System Administrator',
        is_active: true,
        skills: '{}',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('User@123', 12),
        role: 'user',
        phone: '+1987654321',
        location: 'San Francisco, USA',
        bio: 'Full Stack Developer with 5 years of experience',
        is_active: true,
        skills: '{JavaScript,React,Node.js,PostgreSQL}',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: userId2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: await bcrypt.hash('User@123', 12),
        role: 'user',
        phone: '+1122334455',
        location: 'Austin, USA',
        bio: 'UI/UX Designer passionate about great user experiences',
        is_active: true,
        skills: '{Figma,Adobe XD,CSS,HTML}',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);

    // Store admin ID for jobs seeder
    global.seededAdminId = adminId;
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};  