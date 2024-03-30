let totalClaimsValue = 0;
let amountOfClaims = 0;
let totalMileage = 0;

function validateBirthdate() {
    const birthdateInput = document.getElementById("birthdate");
    const genderSelect = document.getElementById("gender");
    const birthdateError = document.getElementById("birthdateError");
    const birthdate = new Date(birthdateInput.value);
    let age = calculateAge(birthdate);

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
    totalMileage = annualMileage;

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
        return false;
    } else {
        backupCameraWarning.textContent = "";
        return true;
    }
}

function updateCalculateButtonState() {
    const insuranceClaimsSelect = document.getElementById('insuranceClaims');
    const calculateButton = document.getElementById('calculateButton');

    if (insuranceClaimsSelect.value === 'yes' || insuranceClaimsSelect.value === 'no') {
        calculateButton.disabled = false; 
    } else {
        calculateButton.disabled = true;
    }
}
function attachEventListeners() {
    document.getElementById("birthdate").addEventListener("input", validateBirthdate);
    document.getElementById("vehicleValue").addEventListener("input", validateVehicleValue);
    linkFields('birthdate', 'vehicleValue', 'birthdateError');
    document.getElementById("vehicleYear").addEventListener("input", validateVehicleYear);
    linkFields('vehicleValue', 'vehicleYear','vehicleValueError');
    document.getElementById("annualMileage").addEventListener("input", validateAnnualMileage);
    linkFields('vehicleYear', 'annualMileage', 'vehicleYearError');
    document.getElementById("hasBackupCamera").addEventListener("change", validateBackupCamera);
    linkFields('annualMileage', 'hasBackupCamera', 'annualMileageError');
    document.getElementById('insuranceClaims').addEventListener('change', updateCalculateButtonState);
    linkFields('hasBackupCamera', 'insuranceClaims','backupCameraWarning');
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
    amountOfClaims = numberOfClaims;

    numberOfClaimsError.textContent = '';
    clearDynamicInputs(); 

   
    if (numberOfClaims > 4) {
        numberOfClaimsError.textContent = 'Vous ne pouvez pas être assuré si vous avez plus de 4 réclamations.';
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

        input.addEventListener('input', calculateTotalClaims);

        inputWrapper.appendChild(label);
        inputWrapper.appendChild(input);
        claimsValueInputs.appendChild(inputWrapper);
    }
});

function calculateTotalClaims() {
    const inputs = document.querySelectorAll('.inputWrapper input[type="number"]');
    let total = 0;

    inputs.forEach(input => {
        total += Number(input.value) || 0;
    });

    const totalError = document.getElementById("numberOfClaimsError");
    if (total > 35000) {
        totalError.textContent = 'Vous ne pouvez pas être assuré si le total des réclamations dépasse $35 000.';
    } else {
        totalError.textContent = totalError.textContent.includes('35 000$') ? '' : totalError.textContent;
        totalClaimsValue = total;
    }
}

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


function linkFields(previousFieldId, currentFieldId, errorFieldId) {
    const previousField = document.getElementById(previousFieldId);
    const currentField = document.getElementById(currentFieldId);
    const errorField = document.getElementById(errorFieldId);
  
    function checkFields() {
        const prevFieldValue = previousField.value.trim();
        const errorFieldValue = errorField.textContent.trim();
        

        if (prevFieldValue && !errorFieldValue) {
            currentField.disabled = false;
        } else {
            currentField.disabled = true;
            currentField.value = ''; 
            
        }
    }

    checkFields();

 
    previousField.addEventListener('input', checkFields);
}
function calculateAge(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function calculatePenalty(){
    let penalty = 0;
    if(totalClaimsValue>25000){
        penalty = 700;
    }
    return penalty;
}


function calculateInsurance() {
    const errorElementIds = [
        "birthdateError",
        "vehicleValueError",
        "vehicleYearError",
        "annualMileageError",
        "numberOfClaimsError",
        "backupCameraWarning" 
    ];
    const genderSelect = document.getElementById("gender");
    const gender = genderSelect.value;
    const birthdateInput = document.getElementById("birthdate");
    let age = calculateAge(birthdateInput.value);
    let baseValue = 0;
    const vehicleValueInput = document.getElementById("vehicleValue");
    const vehicleValue = parseInt(vehicleValueInput.value, 10);
    let total = 0;
    let penalty = calculatePenalty();


  
    let hasErrors = errorElementIds.some(errorElementId => {
        const errorElement = document.getElementById(errorElementId);
        return errorElement && errorElement.textContent.trim() !== "";
    });

    const claimsValue = document.getElementById("insuranceClaims").value;
    if (claimsValue === "yes") {
        const claimInputs = document.querySelectorAll('.inputWrapper input[type="number"]');
        const allClaimsFilled = Array.from(claimInputs).every(input => input.value.trim() !== "");

        if (!allClaimsFilled) {
            document.getElementById("numberOfClaimsError").textContent = 'Tous les champs de réclamation doivent être remplis.';
            hasErrors = true; 
        }
    }

    const calculationResult = document.getElementById("calculationResult");
    if (hasErrors) {
        calculationResult.textContent = "Veuillez corriger les erreurs avant de calculer l'assurance.";
    } else {
        if((gender == 'male' || gender == 'non-binary') && age <25){
            baseValue = vehicleValue*0.05;
        }else if(age>75){
            baseValue = vehicleValue*0.04;
        }else{
            baseValue = vehicleValue*0.015
        }
        
        total = baseValue + (350*amountOfClaims)+(0.02*totalMileage)+penalty;
        

        calculationResult.textContent = "Le prix annuel de de votre soumission d'assurance est de $"+total;
    
    }
}
