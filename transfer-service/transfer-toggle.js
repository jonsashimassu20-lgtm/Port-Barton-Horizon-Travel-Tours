const selectBtn = document.getElementById('select-btn');
const privateWrapper = document.getElementById('private-transfer-wrapper');
const sharedWrapper = document.getElementById('shared-transfer-wrapper');
const countText = document.getElementById('transfer-count-text');

selectBtn.addEventListener('change', function () {

    if(this.value === 'private') {
        
        privateWrapper.classList.remove('hidden');
        sharedWrapper.classList.add('hidden');

        countText.innerText = "Private Transfers: 6 results found";

    } else if (this.value === 'shared') {
        privateWrapper.classList.add('hidden');
        sharedWrapper.classList.remove('hidden');

        countText.innerText = "Shared Transfers: 6 results found";
    } 
})