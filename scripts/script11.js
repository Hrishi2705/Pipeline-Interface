const fs = require('fs');
const mongoose = require('mongoose');

// Replace with your MongoDB connection string
const mongoURI = 'mongodb+srv://hrishikesh:qwertyuiop@cluster0.lz0edaw.mongodb.net/data';

// Replace 'YourCollectionName' with the name of the collection you want to delete
const collectionsToDelete = [
    "input_contacts",
    "names",
    "numbers"
];

const folderPath = 'uploads';
// Function to delete files from a folder
const deleteFilesInFolder = (folderPath) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error('Error reading folder:', err);
        return;
      }
  
      if (files.length === 0) {
        console.log('Folder is empty. No files to delete.');
        return;
      }
  
      files.forEach((file) => {
        const filePath = `${folderPath}/${file}`;
  
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          } else {
            console.log(`Deleted file: ${filePath}`);
          }
        });
      });
    });
  };
  
  // Function to delete MongoDB collections
  const deleteMongoCollections = async () => {
    try {
      await mongoose.connect(mongoURI);
  
      for (const collectionName of collectionsToDelete) {
        try {
          await mongoose.connection.db.dropCollection(collectionName);
          console.log(`Deleted MongoDB collection: ${collectionName}`);
        } catch (error) {
          if (error.code === 26) {
            console.log(`Collection not found: ${collectionName}`);
          } else {
            console.error(`Error deleting MongoDB collection ${collectionName}:`, error);
          }
        }
      }
  
      mongoose.connection.close();
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };
  
  // Main function to execute both tasks
module.exports = async function script11 (){
    deleteFilesInFolder(folderPath);
    await deleteMongoCollections();
  };
  
