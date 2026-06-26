const bankRadio = document.getElementById('direct-transfer-input');
const paypalRadio = document.getElementById('paypal-payment');
const debitCreditRadio = document.getElementById('debit-credit-cards');

const bankInfo = document.getElementById('bank-transfer-info');
const paypalInfo = document.getElementById('paypal-info');
const debitCreditInfo = document.getElementById('debit-credit-info');



function togglePaymentInfo () {

    if(bankRadio.checked) {

        bankInfo.classList.add('show');
        paypalInfo.classList.remove('show');
        debitCreditInfo.classList.remove('show');

    } else if (paypalRadio.checked) {

        paypalInfo.classList.add('show');
        bankInfo.classList.remove('show');
        debitCreditInfo.classList.remove('show');

    } else if (debitCreditRadio.checked) {

        debitCreditInfo.classList.add('show');
        bankInfo.classList.remove('show');
        paypalInfo.classList.remove('show');
    }
}

bankRadio.addEventListener('change', togglePaymentInfo);
paypalRadio.addEventListener('change', togglePaymentInfo);
debitCreditRadio.addEventListener('change', togglePaymentInfo);