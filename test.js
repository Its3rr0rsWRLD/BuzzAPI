  require('dotenv').config();
  const fetch = require('node-fetch');
  const readline = require('readline');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const API_KEY = process.env.API_KEY;

  async function testCreateFolder() {
    const folderName = await askQuestion('Enter folder name to create: ');
    const response = await fetch('http://localhost:3000/api/buzzheavier/folder/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `session=${API_KEY}`,
      },
      body: JSON.stringify({ name: folderName }),
    });
    const data = await response.json();
    console.log('Response:', data);
  }

  async function testGetFolders() {
    const response = await fetch('http://localhost:3000/api/buzzheavier/getFolders', {
      method: 'GET',
      headers: {
        'Cookie': `session=${API_KEY}`,
      },
    });
    const data = await response.json();
    console.log('Folders:', data);
  }

  async function testDeleteFolder() {
    const folderIdentifier = await askQuestion('Enter folder ID or name to delete: ');
    const isId = /^[a-zA-Z0-9]{10}$/.test(folderIdentifier);
    const body = isId ? { id: folderIdentifier } : { name: folderIdentifier };

    const response = await fetch('http://localhost:3000/api/buzzheavier/folder/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `session=${API_KEY}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log('Response:', data);
  }

  function askQuestion(query) {
    return new Promise(resolve => rl.question(query, answer => resolve(answer)));
  }

  async function mainMenu() {
    console.log('\nSelect an API test to run:');
    console.log('1. Create Folder');
    console.log('2. Get Folders');
    console.log('3. Delete Folder');
    console.log('4. Exit');

    const choice = await askQuestion('Enter choice (1-4): ');

    switch (choice) {
      case '1':
        await testCreateFolder();
        break;
      case '2':
        await testGetFolders();
        break;
      case '3':
        await testDeleteFolder();
        break;
      case '4':
        console.log('Exiting...');
        rl.close();
        return;
      default:
        console.log('Invalid choice. Please select 1, 2, 3, or 4.');
    }

    mainMenu();
  }

  mainMenu();