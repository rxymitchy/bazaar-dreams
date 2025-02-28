
// This file lets us start the server without modifying package.json
import { exec } from 'child_process';

console.log('Starting the backend server...');
const server = exec('node server.js');

server.stdout.on('data', (data) => {
  console.log(`Server: ${data}`);
});

server.stderr.on('data', (data) => {
  console.error(`Server Error: ${data}`);
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.kill();
  process.exit();
});
