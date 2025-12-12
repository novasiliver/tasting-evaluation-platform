const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    const password = 'Admin123!';
    const saltRounds = 12;
    const hash = await bcrypt.hash(password, saltRounds);

    // Check if admin user already exists
    const existingAdmin = await prisma.user.findFirst({
      where: {
        OR: [
          { username: 'admin' },
          { email: 'admin@tastecert.com' },
          { role: 'ADMIN' }
        ]
      }
    });

    if (existingAdmin) {
      console.log('='.repeat(60));
      console.log('ADMIN USER ALREADY EXISTS');
      console.log('='.repeat(60));
      console.log('\nExisting admin user:');
      console.log('  ID:', existingAdmin.id);
      console.log('  Username:', existingAdmin.username);
      console.log('  Email:', existingAdmin.email);
      console.log('  Role:', existingAdmin.role);
      console.log('\n' + '='.repeat(60));
      return;
    }

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        id: 'admin-001',
        username: 'admin',
        name: 'Administrator',
        email: 'admin@tastecert.com',
        password: hash,
        role: 'ADMIN',
        accountStatus: 'APPROVED', // Admin is always approved
      },
    });

    console.log('='.repeat(60));
    console.log('ADMIN USER CREATED SUCCESSFULLY');
    console.log('='.repeat(60));
    console.log('\nAdmin User Details:');
    console.log('  ID:', admin.id);
    console.log('  Username:', admin.username);
    console.log('  Name:', admin.name);
    console.log('  Email:', admin.email);
    console.log('  Role:', admin.role);
    console.log('\n' + '='.repeat(60));
    console.log('LOGIN CREDENTIALS:');
    console.log('='.repeat(60));
    console.log('  Username: admin');
    console.log('  Password: Admin123!');
    console.log('='.repeat(60));
  } catch (error) {
    console.error('='.repeat(60));
    console.error('ERROR CREATING ADMIN USER');
    console.error('='.repeat(60));
    console.error('\nError:', error.message);
    
    if (error.code === 'P2002') {
      console.error('\nA user with this username or email already exists.');
    }
    console.error('='.repeat(60));
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();

