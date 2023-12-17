module.exports = async function Script26() {
  try {
      const pythonProcess = spawn('python', ['scripts/pythonScripts/script5.py']);

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
      console.log("Script 5 completed");
      }
  catch (error) {
      console.error('Error in Script26:', error);
  }
}