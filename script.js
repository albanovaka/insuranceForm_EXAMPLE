function validateBirthdate() {
    const birthdateInput = document.getElementById("birthdate");
    const genderSelect = document.getElementById("gender");
    const birthdateError = document.getElementById("birthdateError");
    const birthdate = new Date(birthdateInput.value);
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const m = today.getMonth() - birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }

    const gender = genderSelect.value;
    let ageThreshold;

    if (gender === 'female') {
        ageThreshold = 16;
    } else if (gender === 'male') {
        ageThreshold = 18;
    } else { 
        ageThreshold = 18;
    }

    if (age < ageThreshold || age >= 100) {
        birthdateError.textContent = `Âge invalide. Pour les ${gender === 'female' ? 'femmes' : gender === 'male' ? 'hommes' : 'personnes non-binaires'}, vous devez avoir au moins ${ageThreshold} ans`;
        return false;
    } else {
        birthdateError.textContent = "";
        return true;
    }
}



function validateVehicleValue() {
    const vehicleValueInput = document.getElementById("vehicleValue");
    const vehicleValueError = document.getElementById("vehicleValueError");
    const vehicleValue = parseInt(vehicleValueInput.value, 10);

    if (vehicleValue > 100000) {
        vehicleValueError.textContent = "La valeur d'achat du véhicule ne doit pas dépasser 100 000$.";
        return false;
    } else {
        vehicleValueError.textContent = "";
        return true;
    }
}
function validateVehicleYear() {
    const vehicleYearInput = document.getElementById("vehicleYear");
    const vehicleYearError = document.getElementById("vehicleYearError");
    const vehicleYear = parseInt(vehicleYearInput.value, 10);
    const currentYear = new Date().getFullYear();

    if (currentYear - vehicleYear > 25) {
        vehicleYearError.textContent = "Un véhicule de plus de 25 ans ne peut pas être assuré.";
        return false;
    } else {
        vehicleYearError.textContent = "";
        return true;
    }
}

function validateAnnualMileage() {
    const annualMileageInput = document.getElementById("annualMileage");
    const annualMileageError = document.getElementById("annualMileageError");
    const annualMileage = parseInt(annualMileageInput.value, 10);

    if (annualMileage > 50000) {
        annualMileageError.textContent = "Une personne qui parcourt plus de 50 000 km par année ne peut pas être assurée.";
        return false;
    } else {
        annualMileageError.textContent = "";
        return true;
    }
}

function validateBackupCamera() {
    const hasBackupCameraSelect = document.getElementById("hasBackupCamera");
    const backupCameraWarning = document.getElementById("backupCameraWarning");

    if (hasBackupCameraSelect.value === "no") {
        backupCameraWarning.textContent = "Veuillez noter : Un véhicule sans caméra de recul ne peut pas être assuré.";
    } else {
        backupCameraWarning.textContent = "";
    }
}

function attachEventListeners() {
    document.getElementById("birthdate").addEventListener("input", validateBirthdate);
    document.getElementById("vehicleValue").addEventListener("input", validateVehicleValue);
    document.getElementById("vehicleYear").addEventListener("input", validateVehicleYear);
    document.getElementById("annualMileage").addEventListener("input", validateAnnualMileage);
    document.getElementById("hasBackupCamera").addEventListener("change", validateBackupCamera);
}

document.addEventListener("DOMContentLoaded", attachEventListeners);
document.getElementById("insuranceClaims").addEventListener("change", function() {
    const claimsValue = this.value;
    const claimsDetails = document.getElementById("claimsDetails");

    // Display or hide the number of claims input based on selection
    if (claimsValue === "yes") {
        claimsDetails.style.display = "block";
    } else {
        claimsDetails.style.display = "none";
        clearClaimsDetails(); // Remove any dynamically added claim amount inputs
    }
});


document.getElementById("insuranceClaims").addEventListener("change", function() {
    const claimsDetails = document.getElementById("claimsDetails");
    const numberOfClaimsInput = document.getElementById("numberOfClaims");
    const numberOfClaimsError = document.getElementById("numberOfClaimsError");
    
    // Clear the previous number of claims and error messages
    numberOfClaimsInput.value = '';
    numberOfClaimsError.textContent = '';
    
    clearClaimsDetails();

    if (this.value === "yes") {
        claimsDetails.style.display = "block";
    } else {
        claimsDetails.style.display = "none";
    }
});


function clearClaimsDetails() {
    // Remove all child elements after the number of claims input field
    const claimsDetails = document.getElementById("claimsDetails");
    while (claimsDetails.children.length > 2) {
        claimsDetails.removeChild(claimsDetails.lastChild);
    }
}

function calculateInsurance() {
    // Implement your calculation logic here
    // Ensure you validate inputs and calculate the insurance based on provided criteria
    // Display results or rejection message in the 'result' section
}

// You might want to add more event listeners or functions for input validation and other dynamic behavior as needed
