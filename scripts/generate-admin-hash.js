const bcrypt = require('bcrypt');

async function generateAdminHash() {
  const password = 'Admin123!';
  const saltRounds = 12;
  
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    
    console.log('='.repeat(60));
    console.log('ADMIN USER CREATION');
    console.log('='.repeat(60));
    console.log('\nPassword:', password);
    console.log('Bcrypt Hash:', hash);
    console.log('\n' + '='.repeat(60));
    console.log('SQL INSERT COMMAND:');
    console.log('='.repeat(60));
    console.log(`
USE tastecert;

INSERT INTO users (id, username, name, email, password, role, createdAt, updatedAt)
VALUES (
  'admin-001',
  'admin',
  'Administrator',
  'admin@tastecert.com',
  '${hash}',
  'ADMIN',
  NOW(),
  NOW()
);

-- Verify the admin user was created
SELECT id, username, name, email, role FROM users WHERE username = 'admin';
    `);
    console.log('='.repeat(60));
    console.log('\nCopy the SQL commands above and run them in MySQL!');
    console.log('\nThen login with:');
    console.log('  Username: admin');
    console.log('  Password: Admin123!');
    console.log('='.repeat(60));
  } catch (err) {
    console.error('Error:', err);
  }
}

generateAdminHash();

