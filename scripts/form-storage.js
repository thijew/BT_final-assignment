// Store form data in localStorage
function storeFormData() {
    const form = document.getElementById('erfbelastingForm');
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    localStorage.setItem('erfbelastingFormData', JSON.stringify(data));
    localStorage.setItem('lastUpdated', new Date().toISOString());
}

// Restore form data from localStorage
function restoreFormData() {
    const savedData = localStorage.getItem('erfbelastingFormData');
    if (!savedData) return;

    const data = JSON.parse(savedData);
    const form = document.getElementById('erfbelastingForm');

    Object.entries(data).forEach(([key, value]) => {
        const input = form.querySelector(`[name="${key}"]`);
        if (!input) return;

        if (input.type === 'radio') {
            const radio = form.querySelector(`[name="${key}"][value="${value}"]`);
            if (radio) radio.checked = true;
        } else {
            input.value = value;
        }
    });
}

// Auto-save form data every 30 seconds
let autoSaveInterval;
document.addEventListener('DOMContentLoaded', () => {
    restoreFormData();

    // Set up auto-save
    autoSaveInterval = setInterval(storeFormData, 30000);

    // Save when user leaves the page
    window.addEventListener('beforeunload', storeFormData);

    // Save button functionality
    const saveButton = document.querySelector('.btn-secondary');
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            storeFormData();
            alert('Formulier is opgeslagen');
        });
    }
});