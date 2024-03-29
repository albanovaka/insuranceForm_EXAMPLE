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

    if (claimsValue === "yes") {
        claimsDetails.style.display = "block";
    } else {
        claimsDetails.style.display = "none";
        clearClaimsDetails(); 
    }
});

document.getElementById("numberOfClaims").addEventListener("input", function() {
    const numberOfClaims = parseInt(this.value, 10);
    const claimsValueInputs = document.getElementById("claimsDetails");
    const numberOfClaimsError = document.getElementById("numberOfClaimsError");

    numberOfClaimsError.textContent = '';
    clearDynamicInputs(); 

   
    if (numberOfClaims > 4) {
        numberOfClaimsError.textContent = 'Vous ne pouvez pas avoir plus de 4 réclamations.';
        return;
    }

    
    for (let i = 1; i <= numberOfClaims; i++) {
        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'inputWrapper';

        const label = document.createElement('label');
        label.htmlFor = `claimValue${i}`;
        label.textContent = `Valeur de la réclamation #${i}:`;

        const input = document.createElement('input');
        input.type = 'number';
        input.id = `claimValue${i}`;
        input.name = `claimValue${i}`;

        inputWrapper.appendChild(label);
        inputWrapper.appendChild(input);
        claimsValueInputs.appendChild(inputWrapper);
    }
});


function clearDynamicInputs() {
    const inputWrappers = document.querySelectorAll('.inputWrapper');
    inputWrappers.forEach(wrapper => wrapper.remove());
}


function clearClaimsDetails() {
    document.getElementById("claimsDetails").style.display = "none";
    document.getElementById("numberOfClaims").value = ''; 
    clearDynamicInputs(); 
    document.getElementById("numberOfClaimsError").textContent = '';
}


function calculateInsurance() {
    // Implement your calculation logic here
    // Ensure you validate inputs and calculate the insurance based on provided criteria
    // Display results or rejection message in the 'result' section
}

// You might want to add more event listeners or functions for input validation and other dynamic behavior as needed
