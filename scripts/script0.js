const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
const fastcsv = require('fast-csv');

const folderPath = 'uploads';
const mongoURL = 'mongodb+srv://hrishikesh:qwertyuiop@cluster0.lz0edaw.mongodb.net/';
const dbName = 'data';
const collectionName = 'input_contacts'; // Change the collection name

const client = new MongoClient(mongoURL);

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

async function emptyCollection(collection) {
    try {
        await collection.deleteMany({});
        console.log('Collection emptied.');
    } catch (error) {
        console.error('Error emptying collection:', error);
        throw error;
    }
}

async function processFilesInFolder(folderPath) {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        await emptyCollection(collection);
        const files = await fs.promises.readdir(folderPath);
        const csvFiles = files.filter(file => path.extname(file).toLowerCase() === '.csv');

        for (const file of csvFiles) {
            const filePath = path.join(folderPath, file);
            await processFile(filePath, collection);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function processFile(filePath, collection) {
    const bulkOperations = [];

    const fileStream = fs.createReadStream(filePath);
    const csvStream = fastcsv.parse({ headers: true });

    await new Promise((resolve, reject) => {
        fileStream.pipe(csvStream)
            .on('data', async (data) => {
                const name = data.name;
                const phoneNumber = data['phone number']; // Access the "phone number" column

                // Use bulk insert for better performance
                const documentToInsert = { name, phoneNumber };
                bulkOperations.push({ insertOne: { document: documentToInsert } });
            })
            .on('end', async () => {
                resolve();
            })
            .on('error', (error) => {
                reject(error);
            });
    });

    // Execute the bulk operations after processing the entire file
    if (bulkOperations.length > 0) {
        await collection.bulkWrite(bulkOperations);
    }
}

module.exports = async function script0() {
    try {
        await connectToMongoDB();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        await processFilesInFolder(folderPath);

        console.log("Contacts sent to input_contacts");
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close the MongoDB connection after processing
        await client.close();
    }
};
