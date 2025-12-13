const billInput = document.getElementById('billInput');
const peopleInput = document.getElementById('peopleInput');
const customTip = document.getElementById('customTip');
const tipButtons = document.querySelectorAll('.tip-btn');
const tipAmountEl = document.getElementById('tipAmount');
const totalAmountEl = document.getElementById('totalAmount');
const resetBtn = document.getElementById('resetBtn');

let bill = 0;
let tipPercent = 0;
let people = 1;

function calculate() {
    if (bill > 0 && people > 0 && tipPercent >= 0) {
        const tipTotal = bill * (tipPercent / 100);
        const total = bill + tipTotal;
        const tipPerPerson = tipTotal / people;
        const totalPerPerson = total / people;

        tipAmountEl.textContent = `$${tipPerPerson.toFixed(2)}`;
        totalAmountEl.textContent = `$${totalPerPerson.toFixed(2)}`;
        resetBtn.disabled = false;
    } else {
        tipAmountEl.textContent = '$0.00';
        totalAmountEl.textContent = '$0.00';
    }
}

billInput.addEventListener('input', (e) => {
    bill = parseFloat(e.target.value) || 0;
    calculate();
});

peopleInput.addEventListener('input', (e) => {
    people = parseInt(e.target.value) || 1;
    calculate();
});

tipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tipButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        customTip.value = '';
        tipPercent = parseFloat(btn.dataset.tip);
        calculate();
    });
});

customTip.addEventListener('input', (e) => {
    tipButtons.forEach(b => b.classList.remove('active'));
    tipPercent = parseFloat(e.target.value) || 0;
    calculate();
});

resetBtn.addEventListener('click', () => {
    billInput.value = '';
    peopleInput.value = '';
    customTip.value = '';
    tipButtons.forEach(b => b.classList.remove('active'));
    bill = 0;
    tipPercent = 0;
    people = 1;
    tipAmountEl.textContent = '$0.00';
    totalAmountEl.textContent = '$0.00';
    resetBtn.disabled = true;
});