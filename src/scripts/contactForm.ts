document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form') as HTMLFormElement;
    const submitButton = document.getElementById('submit-contact-form-button') as HTMLButtonElement;
    const inputs = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');

    function checkFormValidity() {
        let allFieldsFilled = true;
        inputs.forEach((input) => {
            if (!input.value.trim()) {
                // Use trim() to ensure no whitespace is considered as input
                allFieldsFilled = false;
            }
        });
        submitButton.disabled = !allFieldsFilled;
    }

    inputs.forEach((input) => {
        input.addEventListener('input', checkFormValidity);
    });

    checkFormValidity(); // Initial check in case fields are pre-filled
});
