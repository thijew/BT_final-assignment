class FormHandler {
    constructor() {
        this.form = document.querySelector('form');
        this.inputs = this.form.querySelectorAll('input[type="text"], input[type="number"], input[type="radio"]');
        this.setupValidation();
        this.setupPersistence();
        this.updateProgress();
    }

    setupValidation() {
        this.inputs.forEach(input => {
            // For text/number inputs, validate on blur and input
            if (input.type === 'text' || input.type === 'number') {
                input.addEventListener('blur', (e) => this.validateField(e.target));
                input.addEventListener('input', (e) => this.validateField(e.target));
            }
            // For radio buttons, validate on change
            if (input.type === 'radio') {
                input.addEventListener('change', (e) => this.validateRadioGroup(e.target.name));
            }
        });
    }

    validateField(field) {
        const formGroup = field.closest('.form-group');
        let validationMessage = formGroup.querySelector('.validation-message');

        if (!validationMessage) {
            validationMessage = document.createElement('div');
            validationMessage.className = 'validation-message';
            formGroup.appendChild(validationMessage);
        }

        if (field.validity.valid) {
            validationMessage.textContent = '✓ Correct ingevuld';
            validationMessage.className = 'validation-message success';
        } else {
            validationMessage.textContent = this.getErrorMessage(field);
            validationMessage.className = 'validation-message error';
        }

        this.updateProgress();
    }

    validateRadioGroup(name) {
        const radioButtons = this.form.querySelectorAll(`input[name="${name}"]`);
        const formGroup = radioButtons[0].closest('.form-group');
        let validationMessage = formGroup.querySelector('.validation-message');

        if (!validationMessage) {
            validationMessage = document.createElement('div');
            validationMessage.className = 'validation-message';
            formGroup.appendChild(validationMessage);
        }

        const isValid = Array.from(radioButtons).some(radio => radio.checked);

        if (isValid) {
            validationMessage.textContent = '✓ Correct ingevuld';
            validationMessage.className = 'validation-message success';
        } else {
            validationMessage.textContent = 'Maak een keuze';
            validationMessage.className = 'validation-message error';
        }

        this.updateProgress();
    }

    getErrorMessage(field) {
        if (field.validity.valueMissing) return 'Dit veld is verplicht';
        if (field.validity.patternMismatch) {
            if (field.id === 'bsn') return 'BSN moet 9 cijfers bevatten';
            if (field.id === 'firstLetters') return 'Gebruik hoofdletters en punten';
            return 'Onjuist formaat';
        }
        return 'Dit veld is niet correct ingevuld';
    }

    setupPersistence() {
        // Load saved data
        this.inputs.forEach(input => {
            const savedValue = localStorage.getItem(input.id);
            if (savedValue) {
                if (input.type === 'radio') {
                    input.checked = savedValue === 'true';
                } else {
                    input.value = savedValue;
                }
            }
        });

        // Save data on change
        this.inputs.forEach(input => {
            input.addEventListener('change', (e) => {
                if (e.target.type === 'radio') {
                    localStorage.setItem(e.target.id, e.target.checked);
                } else {
                    localStorage.setItem(e.target.id, e.target.value);
                }
            });
        });
    }

    updateProgress() {
        const requiredFields = Array.from(this.inputs).filter(input => input.required);
        const validFields = requiredFields.filter(input => input.validity.valid);
        const percentage = (validFields.length / requiredFields.length) * 100;

        const progressBar = document.querySelector('.progress-bar-fill');
        progressBar.style.width = `${percentage}%`;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FormHandler();
});