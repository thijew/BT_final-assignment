// Form validation written by ai

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('erfbelastingForm');
    const inputs = form.querySelectorAll('input[required]');

    // Validate fields from the start
    inputs.forEach(input => {
        // Initial validation
        validateField(input);

        // Validate on blur
        input.addEventListener('blur', () => {
            validateField(input);
        });

        // Validate on input
        input.addEventListener('input', () => {
            validateField(input);
        });
    });

    // Special validation for BSN
    const bsnInput = document.getElementById('bsn');
    bsnInput.addEventListener('input', (e) => {
        const bsn = e.target.value;
        if (bsn.length === 9 && /^\d+$/.test(bsn)) {
            if (isValidBSN(bsn)) {
                showValidation(bsnInput, true, 'BSN is geldig');
            } else {
                showValidation(bsnInput, false, 'Dit BSN nummer is niet geldig');
            }
        } else if (bsn.length > 0) {
            showValidation(bsnInput, false, 'Vul een geldig BSN in (9 cijfers)');
        }
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            storeFormData();
            console.log('Form is valid, ready to submit');
        }
    });
});

function validateField(input) {
    // Don't show validation for empty fields until user interaction
    if (input.value.trim() === '' && !input.dataset.interacted) {
        return true;
    }

    if (input.type === 'radio') {
        const radioGroup = document.getElementsByName(input.name);
        const isChecked = Array.from(radioGroup).some(radio => radio.checked);
        showValidation(input, isChecked, isChecked ? 'Correct ingevuld' : 'Maak een keuze');
        return isChecked;
    }

    if (input.value.trim() === '') {
        showValidation(input, false, 'Dit veld is verplicht');
        return false;
    }

    if (input.pattern && !new RegExp(input.pattern).test(input.value)) {
        showValidation(input, false, 'Incorrect formaat');
        return false;
    }

    showValidation(input, true, 'Correct ingevuld');
    return true;
}

function showValidation(input, isValid, message) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;

    let feedbackElement = formGroup.querySelector('.validation-feedback');
    if (!feedbackElement) {
        feedbackElement = document.createElement('span');
        feedbackElement.className = 'validation-feedback';
        formGroup.appendChild(feedbackElement);
    }

    feedbackElement.textContent = message;
    feedbackElement.className = `validation-feedback visible ${isValid ? 'valid' : 'invalid'}`;
    input.setAttribute('aria-invalid', !isValid);
}

function isValidBSN(bsn) {
    if (bsn.length !== 9) return false;

    let sum = 0;
    for (let i = 0; i < 8; i++) {
        sum += (9 - i) * parseInt(bsn[i]);
    }
    sum -= parseInt(bsn[8]);

    return sum % 11 === 0;
}
