const {
    MongoClient
} = require("mongodb");

const {
    spawn
} = require('child_process');

module.exports = async function Script2() {
  try {
      const pythonProcess = spawn('python', ['scripts/pythonScripts/script2.py']);

      pythonProcess.stdout.on('data', (data) => {
          console.log(`Python stdout: ${data}`);
      });

      pythonProcess.stderr.on('data', (data) => {
          console.error(`Python stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
          console.log(`Python process exited with code ${code}`);
      });

      pythonProcess.on('error', (err) => {
          console.error(`Error starting Python process: ${err}`);
      });

      // Wait for the Python script to complete
      await new Promise((resolve) => {
          pythonProcess.on('close', (code) => {
              resolve();
          });
      });
      console.log("Script 2 completed");
      }
  catch (error) {
      console.error('Error in Script26:', error);
  }
}