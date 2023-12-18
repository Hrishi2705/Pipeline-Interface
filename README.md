## Pipeline Interface

This interface is a versatile Express.js application designed to streamline and automate the execution of a chain of scripts. Built with MongoDB as the backend database, this interface provides a user-friendly experience for running and managing scripts with ease.

## Features
- **Drag-and-Drop Functionality:** Upload your input CSV file effortlessly with a simple drag-and-drop feature.
- **CSV Validation:** Validate your CSV file against predefined criteria using the "Check CSV" button.
- **Script Execution:** Initiate script execution with the "Start" button, seamlessly running a series of scripts one after the other.
- **Progress Tracking:** Monitor the progress of the script execution in real-time, knowing exactly which script is currently running.
- **MongoDB Integration:** Select target MongoDB collections directly from the interface using a user-friendly checklist. Specify collection names and formats (CSV/JSON) effortlessly.

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Configure MongoDB connection in the `server.js` file.
4. Run the file: `server.js`
5. Access the interface in your browser: `http://localhost:3000`

## Usage
1. Upload your input CSV file using the drag-and-drop feature.
2. Validate the CSV file by clicking the "Check CSV" button.
3. Configure MongoDB collections through the checklist.
4. Start the script execution with the "Start" button.
   
## Tech Stack
1. `Express.js` Backend
2. `MongoDB` Database
3. `HTML`, `CSS`, `BootStrap`, `JS` Frontend
