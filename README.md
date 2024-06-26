# Pipeline Interface

This interface is a versatile Express.js application designed to streamline and automate the execution of a chain of scripts. Built with MongoDB as the backend database, this interface provides a user-friendly experience for running and managing scripts with ease.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Sections](#sections)
  - [Pipeline](#pipeline)
  - [Collections](#collections)
- [Setup](#setup)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

## Introduction

The Pipeline Interface provides a user-friendly experience for running and managing scripts with ease. With MongoDB as the backend database, users can execute scripts sequentially and manage collections efficiently.

## Features
- **Script Execution:** Initiate script execution with the "Start" button, seamlessly running a series of scripts one after the other (or phase-wise).
- **Phase Management**: Organize scripts into phases for sequential execution.
- **CSV Upload and Validation:** Upload your input CSV file effortlessly with a simple drag-and-drop feature to give input to the scripts and validate your CSV file against predefined criteria using the "Check CSV" button.
- **Progress Tracking:** Monitor the progress of the script execution in real-time, knowing exactly which script is currently running.
- **Collection Management**: View all collections related to different phases and download them directly from the interface.

## Sections

### Pipeline

The Pipeline section allows users to execute scripts in phases. This feature is tailored for MongoDB integration scripts, such as those creating, updating, or deleting collections. Users can divide scripts into phases and execute them sequentially.

### Collections

In the Collections section, users can view all collections related to different phases. This feature provides transparency regarding the data generated by scripts. Users can directly download collections from the interface for further analysis or use.

## Setup

To set up and run the Pipeline Interface locally, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure MongoDB connection settings in the `.env` file.
4. Start the application using `nodemon .\server.js`.

## Usage

Once the application is running, access it through your web browser. Utilize the Pipeline section to execute scripts and manage phases. Navigate to the Collections section to view and download generated collections.

## Screenshots

![image](https://github.com/Hrishi2705/Pipeline-Interface/assets/134578117/2cb692c0-49c7-4e36-895a-4a6557810155)

![image](https://github.com/Hrishi2705/Pipeline-Interface/assets/134578117/d2a6d4a6-9e20-4c12-97b2-458324b34937)

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Implement your changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

