const express = require('express');
const multer = require('multer');
const fs = require('fs/promises');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const {
    ObjectId
} = require('mongodb');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const {
    exec
} = require('child_process');

// Use dynamic import to load p-queue
import('p-queue').then(({
    default: PQueue
}) => {
    // Create a queue to manage script execution
    const scriptQueue = new PQueue({
        concurrency: 1
    });

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/public/phase1.html');
    });

    const uploadDir = './uploads';
    const upload = multer({
        dest: uploadDir
    });
    // Add body-parser middleware to parse JSON and URL-encoded data
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(express.urlencoded({
        extended: true
    }));
    // Create a directory for uploads if it doesn't exist


    // Function to create the uploads directory if it doesn't exist
    async function createUploadsDir() {
        try {
            await fs.access(uploadDir);
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.mkdir(uploadDir);
            } else {
                throw error;
            }
        }
    }

    // Call the function to create the uploads directory
    createUploadsDir().catch((err) => {
        console.error(err);
    });

    // Serve static files from the "public" directory
    app.use(express.static('public'));

    // Handle file upload

    app.post('/upload', upload.array('csvFiles'), async (req, res) => {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send('No files uploaded.');
        }

        const files = req.files;

        try {
            // Create a directory for storing the CSV files if it doesn't exist
            await createUploadsDir();

            // Iterate through the uploaded files and store them with unique names
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const uniqueFileName = `input${i + 1}.csv`;
                await fs.rename(file.path, `${uploadDir}/${uniqueFileName}`);
            }

            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    });


    const scriptFunctions = {
        0: require('./scripts/script0'),
        1: require('./scripts/script1'),
        2: require('./scripts/script2'),
        3: require('./scripts/script3'),
        4: require('./scripts/script4'),
        5: require('./scripts/script5'),
        6: require('./scripts/script6'),
        7: require('./scripts/script7'),
        8: require('./scripts/script8'),
        9: require('./scripts/script9'),
        10: require('./scripts/script10'),
        11: require('./scripts/script11'),
    };

    app.get('/runScript:scriptId', async (req, res) => {
        const scriptId = req.params.scriptId;

        if (scriptFunctions[scriptId]) {
            try {
                // Enqueue the script for execution
                await scriptQueue.add(() => scriptFunctions[scriptId]());
                console.log(`Script ${scriptId} executed successfully`);
                res.sendStatus(200);
            } catch (error) {
                console.error(error);
                res.sendStatus(500);
            }
        } else {
            res.status(404).send('Script not found');
        }
    });


    app.post('/download', async (req, res) => {
        const format = req.body.format;
        const selectedCollection = req.body.collection;


        const collections = {
            'input_contacts': 'input_contacts',
            'names': 'names',
            'numbers': 'numbers',
        };

        let client;
        // Connect to MongoDB and retrieve the selected collection
        try {
            client = await MongoClient.connect('mongodb+srv://hrishikesh:qwertyuiop@cluster0.lz0edaw.mongodb.net/');
            const db = client.db('data');
            const collection = db.collection(selectedCollection);
            const data = await collection.find().toArray();

            // Generate the file content based on the selected format
            let fileContent;
            if (format === 'csv') {
                // Convert the data to CSV format
                fileContent = convertToCSV(data);
                res.setHeader('Content-Disposition', `attachment; filename=${selectedCollection}.csv`);
                res.setHeader('Content-Type', 'text/csv');
            } else {
                // Convert the data to JSON format
                fileContent = JSON.stringify(data, null, 2);
                res.setHeader('Content-Disposition', `attachment; filename=${selectedCollection}.json`);
                res.setHeader('Content-Type', 'application/json');
            }

            // Send the file to the client
            res.send(fileContent);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } finally {
            if (client && client.close) {
                client.close(); // Close the MongoDB connection if it was established and has a close method
            }
        }
    });


    function convertToCSV(data) {
        if (!data || data.length === 0) {
            return ''; // Return an empty string if data is undefined, null, or empty
        }

        const header = Object.keys(data[0]);
        const csv = [
            header.join(','),
            ...data.map(row => header.map(fieldName => JSON.stringify(row[fieldName])).join(','))
        ].join('\n');
        return csv;
    }


    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
    });

});