document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    const strengthIndicator = document.getElementById('strength');
    const timeToCrackIndicator = document.getElementById('time-to-crack');

    const strength = calculateStrength(password);
    const timeToCrack = estimateTimeToCrack(password);

    strengthIndicator.textContent = `Strength: ${strength}`;
    timeToCrackIndicator.textContent = `Estimated time to crack: ${timeToCrack}`;

    updateStrengthColor(strengthIndicator, strength);
});

function calculateStrength(password) {
    const length = password.length;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    let strength = 'Very Weak';

    if (length >= 8) {
        if (hasLower || hasUpper || hasNumber || hasSpecial) {
            strength = 'Weak';
        }
        if ((hasLower && hasUpper) || (hasLower && hasNumber) || (hasLower && hasSpecial) || (hasUpper && hasNumber) || (hasUpper && hasSpecial) || (hasNumber && hasSpecial)) {
            strength = 'Medium';
        }
        if ((hasLower && hasUpper && hasNumber) || (hasLower && hasUpper && hasSpecial) || (hasLower && hasNumber && hasSpecial) || (hasUpper && hasNumber && hasSpecial)) {
            strength = 'Strong';
        }
        if (length >= 12 && hasLower && hasUpper && hasNumber && hasSpecial) {
            strength = 'Very Strong';
        }
    }

    return strength;
}

function estimateTimeToCrack(password) {
    const length = password.length;
    const charset = (/[a-z]/.test(password) ? 26 : 0) +
                    (/[A-Z]/.test(password) ? 26 : 0) +
                    (/[0-9]/.test(password) ? 10 : 0) +
                    (/[^A-Za-z0-9]/.test(password) ? 32 : 0);
    
    const combinations = Math.pow(charset, length);
    const attemptsPerSecond = 1e9; // 1 billion attempts per second
    const seconds = combinations / attemptsPerSecond;

    const years = seconds / (60 * 60 * 24 * 365);

    if (years > 1e6) {
        return '> 1 million years';
    } else if (years > 1e3) {
        return '> 1 thousand years';
    } else if (years > 1) {
        return `${Math.round(years)} years`;
    } else if (seconds > 60 * 60) {
        return `${Math.round(seconds / (60 * 60))} hours`;
    } else if (seconds > 60) {
        return `${Math.round(seconds / 60)} minutes`;
    } else {
        return `${Math.round(seconds)} seconds`;
    }
}

function updateStrengthColor(element, strength) {
    let color = '#ff4d4d'; // Very Weak: Red

    if (strength === 'Weak') {
        color = '#ff6666'; // Weak: Light Red
    } else if (strength === 'Medium') {
        color = '#ffcc00'; // Medium: Yellow
    } else if (strength === 'Strong') {
        color = '#66cc66'; // Strong: Green
    } else if (strength === 'Very Strong') {
        color = '#339933'; // Very Strong: Dark Green
    }

    element.style.color = color;
}
