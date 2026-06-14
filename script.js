// DOM Cache
const tempInput = document.getElementById('tempInput');
const unitSelect = document.getElementById('unitSelect');
const convertBtn = document.getElementById('convertBtn');
const outputDisplay = document.getElementById('outputDisplay');

// Core conversion formulas using Celsius as the baseline anchor
const convertToCelsius = {
    C: (val) => val,
    F: (val) => (val - 32) * 5 / 9,
    K: (val) => val - 273.15
};

const convertFromCelsius = {
    C: (val) => val,
    F: (val) => (val * 9 / 5) + 32,
    K: (val) => val + 273.15
};

// Main execution function
function processConversion() {
    const rawValue = tempInput.value.trim();
    const currentUnit = unitSelect.value;

    // Direct strict manual validation for numbers
    if (rawValue === '' || isNaN(rawValue)) {
        outputDisplay.classList.removeAttribute('class'); // clear placeholders
        outputDisplay.innerHTML = '<span class="err">Please enter a valid numeric value.</span>';
        return;
    }

    const numValue = parseFloat(rawValue);
    
    // Step 1: Normalize input value to Celsius
    const baseCelsius = convertToCelsius[currentUnit](numValue);
    
    // Step 2: Build strings for the alternative units
    const unitsList = ['C', 'F', 'K'];
    let resultsHTML = [];

    unitsList.forEach(targetUnit => {
        // We only want to display conversions to *other* units
        if (targetUnit !== currentUnit) {
            const rawConverted = convertFromCelsius[targetUnit](baseCelsius);
            
            // Format to maximum 2 decimal places, stripped of trailing zeros
            const roundedConverted = Number(rawConverted.toFixed(2));
            const unitLabel = targetUnit === 'K' ? 'K' : `°${targetUnit}`;
            
            resultsHTML.push(`${roundedConverted} ${unitLabel}`);
        }
    });

    // Update UI
    outputDisplay.classList.remove('output-placeholder');
    outputDisplay.innerHTML = resultsHTML.join('<br>');
}

// Event Listeners
convertBtn.addEventListener('click', processConversion);

// Optional UX tweak: Allow pressing 'Enter' in input field to convert
tempInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') processConversion();
});