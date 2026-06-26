const rentalRateRadio = document.getElementById('rental-rates');
const pickUpdropOffRadio = document.getElementById('pickup-drop-off');
const idorCashRadio = document.getElementById('id-or-cash');
const insuranceRadio = document.getElementById('insurance');
const mileageRadio = document.getElementById('mileage');
const fuelConsumptionRadio = document.getElementById('fuel-consumption');

const rentalDetails = document.getElementById('rental-details');
const pickUpdropOffDetails = document.getElementById('pickup-dropoff-details');
const idcashDetails = document.getElementById('idcash-details');
const insuranceDetails = document.getElementById('insurance-details');
const priceInfo = document.getElementById('price-info');
const mileageDetails = document.getElementById('mileage-details');
const fuelConsumptionDetails = document.getElementById('fuel-consumption-details');

function toggleDescriptionInfo() {
    if(rentalRateRadio.checked) {

        rentalDetails.classList.add('show');
        priceInfo.classList.add('show');
        pickUpdropOffDetails.classList.remove('show');
        idcashDetails.classList.remove('show');
        insuranceDetails.classList.remove('show');
        mileageDetails.classList.remove('show');
        fuelConsumptionDetails.classList.remove('show');

    } else if (pickUpdropOffRadio.checked) {

        pickUpdropOffDetails.classList.add('show');
        rentalDetails.classList.remove('show');
        priceInfo.classList.remove('show');
        idcashDetails.classList.remove('show');
        insuranceDetails.classList.remove('show');
        mileageDetails.classList.remove('show');
        fuelConsumptionDetails.classList.remove('show');

    } else if (idorCashRadio.checked){

        idcashDetails.classList.add('show');
        rentalDetails.classList.remove('show');
        priceInfo.classList.remove('show');
        pickUpdropOffDetails.classList.remove('show');
        insuranceDetails.classList.remove('show');
        mileageDetails.classList.remove('show');
        fuelConsumptionDetails.classList.remove('show');

    } else if (insuranceRadio.checked) {

        insuranceDetails.classList.add('show');
        rentalDetails.classList.remove('show');
        priceInfo.classList.remove('show');
        pickUpdropOffDetails.classList.remove('show');
        idcashDetails.classList.remove('show');
        mileageDetails.classList.remove('show');
        fuelConsumptionDetails.classList.remove('show');
        
    } else if (mileageRadio.checked) {

        mileageDetails.classList.add('show');
        rentalDetails.classList.remove('show');
        priceInfo.classList.remove('show');
        pickUpdropOffDetails.classList.remove('show');
        idcashDetails.classList.remove('show');
        insuranceDetails.classList.remove('show');
        fuelConsumptionDetails.classList.remove('show');

    } else if (fuelConsumptionRadio.checked) {

        fuelConsumptionDetails.classList.add('show');
        rentalDetails.classList.remove('show');
        priceInfo.classList.remove('show');
        pickUpdropOffDetails.classList.remove('show');
        idcashDetails.classList.remove('show');
        insuranceDetails.classList.remove('show');
        mileageDetails.classList.remove('show');

    }
}

rentalRateRadio.addEventListener('change', toggleDescriptionInfo);
pickUpdropOffRadio.addEventListener('change', toggleDescriptionInfo);
idorCashRadio.addEventListener('change', toggleDescriptionInfo);
insuranceRadio.addEventListener('change', toggleDescriptionInfo);
mileageRadio.addEventListener('change', toggleDescriptionInfo);
fuelConsumptionRadio.addEventListener('change', toggleDescriptionInfo);