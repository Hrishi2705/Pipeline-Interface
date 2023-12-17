// This is just a sample script, 

const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://hrishikesh:qwertyuiop@cluster0.lz0edaw.mongodb.net/';
const dbName = 'data';

module.exports = async function script1() {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    const inputContactsCollection = db.collection('input_contacts');
    const namesCollection = db.collection('names');
    const numbersCollection = db.collection('numbers');

    const names = [];
    const numbers = new Set();

    const cursor = inputContactsCollection.find();

    await cursor.forEach((doc) => {
      const name = doc.name ? doc.name.trim() : '';
      const phoneNumber = doc.phoneNumber ? doc.phoneNumber.trim() : '';

      if (name) {
        names.push(name);
      }

      if (phoneNumber) {
        numbers.add(phoneNumber);
      }
    });

    const bulkOpsNames = names.map((name) => ({
      name,
    }));

    const bulkOpsNumbers = Array.from(numbers).map((phoneNumber) => ({
      phoneNumber,
    }));

    if (bulkOpsNames.length > 0) {
      await namesCollection.insertMany(bulkOpsNames);
    }

    if (bulkOpsNumbers.length > 0) {
      await numbersCollection.insertMany(bulkOpsNumbers);
    }

    console.log('Total number of unique names and phone numbers in input:', bulkOpsNames.length + bulkOpsNumbers.length);
    console.log('Number of names written to "names" collection:', bulkOpsNames.length);
    console.log('Number of phone numbers written to "numbers" collection:', bulkOpsNumbers.length);
    console.log('Script 1 completed');
  } catch (error) {
    console.error('Error:', error);
  }
};
