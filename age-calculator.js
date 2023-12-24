function calculateDifference() {
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');

    let hasError = false;

    function addError(input, errorId, message, showMessage = true) {
        if (showMessage) {
            document.getElementById(errorId).textContent = message;
        }
        input.classList.add('border-[#ff6b6b]');
        input.previousElementSibling.classList.remove('text-gray-500');
        input.previousElementSibling.classList.add('text-[#ff6b6b]');

        hasError = true;
    }

    const inputs = document.querySelectorAll('.input-wrapper input');
    const labels = document.querySelectorAll('.input-wrapper label');
    inputs.forEach(input => input.classList.remove('border-[#ff6b6b]'));
    labels.forEach(label => label.classList.remove('text-[#ff6b6b]'));
    labels.forEach(label => label.classList.add('text-gray-500'));
    document.querySelectorAll('.error-f').forEach(span => span.textContent = '');

    function validateInput(input, errorId, validationFunc, errorMessage) {
        if (!input.value.trim()) {
            addError(input, errorId, 'This field is required');
        } else if (!validationFunc(input.value)) {
            addError(input, errorId, errorMessage);
        }
    }

    const isValidDay = (day, month, year) => {
        const dayNum = parseInt(day, 10);
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        return dayNum >= 1 && dayNum <= lastDayOfMonth;
    };

    const isValidMonth = month => {
        const monthNum = parseInt(month, 10);
        return monthNum >= 1 && monthNum <= 12;
    };

    const isValidYear = year => {
        const yearNum = parseInt(year, 10);
        return yearNum <= new Date().getFullYear();
    };

    validateInput(yearInput, 'ErrorYear', isValidYear, 'Must be a valid year in the past');
    validateInput(monthInput, 'ErrorMonth', isValidMonth, 'Must be a valid month');
    validateInput(dayInput, 'ErrorDay', day => isValidDay(day, monthInput.value, yearInput.value), 'Must be a valid day');

    if (hasError) {
        inputs.forEach(input => input.classList.add('border-red-500'));
        labels.forEach(label => label.classList.remove('text-gray-500'));
        labels.forEach(label => label.classList.add('text-[#ff6b6b]'));
    } else {
        inputs.forEach(input => input.classList.remove('border-red-500'));
        labels.forEach(label => label.classList.remove('text-[#ff6b6b]'));
        labels.forEach(label => label.classList.add('text-gray-500'));
    }

    const day = parseInt(dayInput.value, 10);
    const month = parseInt(monthInput.value, 10) - 1;
    const year = parseInt(yearInput.value, 10);

    if (!hasError) {
        const enteredDate = new Date(year, month, day);
        const today = new Date();
        let years = today.getFullYear() - enteredDate.getFullYear();
        let months = today.getMonth() - enteredDate.getMonth();
        let days = today.getDate() - enteredDate.getDate();

        if (days < 0) {
            const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += previousMonth.getDate();
            months--;
        }
        if (months < 0) {
            months += 12;
            years--;
        }

        document.getElementById('years').textContent = `${years}`;
        document.getElementById('months').textContent = `${months}`;
        document.getElementById('days').textContent = `${days}`;
    } else {
        document.getElementById('years').textContent = '--';
        document.getElementById('months').textContent = '--';
        document.getElementById('days').textContent = '--';
    }
}

document.querySelector('.submit-arrow').addEventListener('click', calculateDifference);
