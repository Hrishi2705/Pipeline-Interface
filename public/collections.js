document.addEventListener('DOMContentLoaded', function () {
    const downloadForm = document.getElementById('downloadForm'); // Select the form element by its unique ID

    downloadForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const collectionSelect = document.getElementById('collection');
        const formatRadio = document.querySelector('input[name="format"]:checked');

        if (!collectionSelect || !formatRadio) {
            alert('Please select a collection and format.');
            return;
        }

        const selectedCollection = collectionSelect.value;
        const selectedFormat = formatRadio.value;

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
