const inputFile = document.getElementById('csvFileInput');
const checkAndUploadButton = document.getElementById('checkAndUpload');
const startButton = document.getElementById('startButton');
const progressBar = document.querySelector('.progressbar');
const stepElements = document.querySelectorAll('.step');
async function checkAndUploadCSV() {
    const files = inputFile.files;
    if (!files.length) {
        console.error('No files selected.');
        return;
    }

    // Disable the button to prevent multiple uploads
    checkAndUploadButton.setAttribute('disabled', true);

    // Check each file for the "name" column
    let nameFound = true;
    const columnName = 'name'; // Specify the exact column name
    const columnRegex = new RegExp(`\\b${columnName}\\b`, 'i');

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const text = await file.text();

        // Check if the CSV file contains the "name" column as a separate word
        if (!columnRegex.test(text)) {
            nameFound = false;
            alert(`File ${file.name} does not have a "${columnName}" column. Please select a valid CSV file.`);
            window.location.reload();
            return;
        }
    }
    // Proceed only if the "name" column is found in all files
    if (nameFound) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('csvFiles', files[i]);
        }

        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            console.log(`${files.length} CSV files uploaded successfully.`);

            await fetch('/runscript0');
            // Enable the startButton
            startButton.removeAttribute('disabled');
        } else {
            alert("File not proper");
            console.error('Error uploading files.');
        }
    }
}


checkAndUploadButton.addEventListener('click', checkAndUploadCSV);
inputFile.addEventListener('change', () => {
    if (inputFile.files.length > 0) {
        checkAndUploadButton.removeAttribute('disabled');
    } else {
        checkAndUploadButton.setAttribute('disabled', true);
    }
});

startButton.addEventListener('click', async () => {
    const file = inputFile.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('csvFiles', file);

        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            startButton.setAttribute('disabled', true);
            await runScripts();
        } else {
            console.error('Error uploading file');
        }
    }
});


async function runScripts() {
    const scriptIds = [1, 2]; // Array of script IDs 1 and 2

    for (const scriptId of scriptIds) {
        try {
            await fetch(`/runScript${scriptId}`)
                .then(async () => {
                    // This part runs after the script has completed successfully.
                    updateStepProgressBar(scriptId);
                });
        } catch (error) {
            console.error(`Error running Script ${scriptId}:`, error);
            // Handle the error, e.g., break the loop or perform error recovery
        }
    }
}



function updateStepProgressBar(stepIndex) {
    // Add "active" class to the current step
    stepElements[stepIndex - 1].classList.add('active');

    // Remove "active" class from all upcoming steps
    for (let i = stepIndex; i < stepElements.length; i++) {
        stepElements[i].classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const downloadForm = document.getElementById('downloadForm'); // Select the form element by its unique ID

    downloadForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formatRadio = document.querySelector('input[name="format"]:checked');

        // Find the selected collection radio button
        const collectionRadios = document.querySelectorAll('input[name="collection"]:checked');

        if (!formatRadio || collectionRadios.length === 0) {
            alert('Please select a collection and format.');
            return;
        }

        const selectedFormat = formatRadio.value;
        const selectedCollection = collectionRadios[0].value; // Get the value of the selected collection radio button

        // Check if "Select" option is selected for collection
        if (selectedCollection === 'None') {
            alert('Please select a valid collection.');
            return;
        }

        // Set the form's action attribute dynamically
        downloadForm.action = `/download?collection=${selectedCollection}&format=${selectedFormat}`;

        // Submit the form
        downloadForm.submit();
    });
});


const clearButton = document.getElementById('clearButton');

clearButton.addEventListener('click', async () => {
    try {
        await fetch('/runscript11');
        location.reload(true);
    } catch (error) {
        console.error('Error triggering the script:', error);
    }
});

document.querySelectorAll(".clear-button").forEach(button =>
    button.addEventListener("click", e => {
        if (!button.classList.contains("custom_delete")) {
            button.classList.add("custom_delete");

            setTimeout(() => button.classList.remove("custom_delete"), 2200);
        }
        e.preventDefault();
    })
);

const navTabs = document.querySelectorAll("#nav-tabs > a");
navTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        navTabs.forEach((tab) => {
            tab.classList.remove("active");
        });
        tab.classList.add("active");
    });
});