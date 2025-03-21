// Marriage fields written by ai

document.addEventListener('DOMContentLoaded', () => {
    const marriedYes = document.getElementById('marriedY');
    const marriedNo = document.getElementById('marriedN');
    const marriageFields = document.querySelector('fieldset[data-openklap="married"]');

    function toggleMarriageFields() {
        if (marriedYes.checked) {
            marriageFields.style.display = 'block';
            // Reset required attributes
            marriageFields.querySelectorAll('input[required]').forEach(input => {
                input.required = true;
            });
        } else {
            marriageFields.style.display = 'none';
            // Remove required attributes to prevent validation errors
            marriageFields.querySelectorAll('input[required]').forEach(input => {
                input.required = false;
                input.value = ''; // Optional: clear values
            });
        }
    }

    // Initial state
    toggleMarriageFields();

    // Add event listeners
    marriedYes.addEventListener('change', toggleMarriageFields);
    marriedNo.addEventListener('change', toggleMarriageFields);

    // Set max date for marriage date input
    const marriageDateInput = document.getElementById('marriageDate');
    if (marriageDateInput) {
        const today = new Date().toISOString().split('T')[0];
        marriageDateInput.setAttribute('max', today);
    }
});
