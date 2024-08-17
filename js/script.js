const form = document.querySelector('#form');

function checkValidation() {
  let hasError = false;

  const amountInput = document.querySelector('#amountInput');
  const termInput = document.querySelector('#termInput');
  const rateInput = document.querySelector('#rateInput');
  const radioInputs = document.querySelectorAll("input[type='radio']");

  const inputs = document.querySelectorAll('.input');
  const signs = document.querySelectorAll('.sign');
  const alerts = document.querySelectorAll('.alert');

  if (amountInput.value === '') {
    signs[0].classList.add('error');
    alerts[0].classList.add('error');
    inputs[0].classList.add('error');
    hasError = true;
  } else {
    signs[0].classList.remove('error');
    alerts[0].classList.remove('error');
    inputs[0].classList.remove('error');
  }

  if (termInput.value === '') {
    signs[1].classList.add('error');
    alerts[1].classList.add('error');
    inputs[1].classList.add('error');
    hasError = true;
  } else {
    signs[1].classList.remove('error');
    alerts[1].classList.remove('error');
    inputs[1].classList.remove('error');
  }

  if (rateInput.value === '') {
    signs[2].classList.add('error');
    alerts[2].classList.add('error');
    inputs[2].classList.add('error');
    hasError = true;
  } else {
    signs[2].classList.remove('error');
    alerts[2].classList.remove('error');
    inputs[2].classList.remove('error');
  }

  const isAnyChecked = Array.from(radioInputs).some((input) => input.checked);

  if (!isAnyChecked) {
    radioInputs.forEach((input) => {
      input.parentElement.classList.add('error');
    });
    hasError = true;
  } else {
    radioInputs.forEach((input) => {
      input.parentElement.classList.remove('error');
    });
  }

  if (!hasError) {
    calculateMortgage();
  }
}

function calculateMortgage() {
  let calc = 0;
  calc++;
  if (calc === 1) {
    document.querySelector('.col-2').classList.remove('nocalc');
    document.querySelector('.no-calc').classList.add('active');
    document.querySelector('.result ').classList.add('active');
  }

  const amount = parseFloat(
    document.getElementById('amountInput').value.trim()
  );
  const term = parseInt(document.getElementById('termInput').value.trim());
  const rate = parseFloat(document.getElementById('rateInput').value.trim());

  if (
    isNaN(amount) ||
    amount <= 0 ||
    isNaN(term) ||
    term <= 0 ||
    isNaN(rate) ||
    rate <= 0
  ) {
    console.error('Please enter valid values for amount, term, and rate.');
    return;
  }

  const numberOfPayments = term * 12;
  const monthlyRate = rate / 100 / 12;

  const monthlyPayment =
    (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const totalRepayments = monthlyPayment * numberOfPayments;

  document.getElementById(
    'month-repayments'
  ).innerText = `£${monthlyPayment.toFixed(2)}`;
  document.getElementById('Total').innerText = `£${totalRepayments.toFixed(2)}`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkValidation();
});

document.querySelectorAll("input[type='number']").forEach((input) => {
  input.addEventListener('click', (e) => {
    document.querySelectorAll('.sign').forEach((e) => {
      e.classList.remove('active');
    });
    document.querySelectorAll('.input').forEach((e) => {
      e.classList.remove('active');
    });

    e.target.parentElement.classList.add('active');
    e.target.parentElement.querySelector('.sign').classList.add('active');
  });
});

document.querySelectorAll("input[type='number']").forEach((input) => {
  input.onblur = function () {
    document.querySelectorAll('.sign').forEach((e) => {
      e.classList.remove('active');
    });
    document.querySelectorAll('.input').forEach((e) => {
      e.classList.remove('active');
    });
  };
});

document.querySelectorAll("input[type='radio']").forEach((input) => {
  input.addEventListener('click', (e) => {
    document.querySelectorAll("input[type='radio']").forEach((input) => {
      input.parentElement.classList.remove('active');
    });
    e.target.parentElement.classList.add('active');
  });
});

function clearAll() {
  document.querySelectorAll('input[type="number"]').forEach((input) => {
    input.value = '';
  });

  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.checked = false;
  });

  document.querySelectorAll('.alert').forEach((alert) => {
    alert.style.display = 'none';
  });

  document.querySelectorAll('.error').forEach((element) => {
    element.classList.remove('error');
  });


  document.querySelectorAll('.active').forEach(element => {
    element.classList.remove('active');
  });

  document.querySelectorAll('.error').forEach(element => {
    element.classList.remove('error');
  });

  document.querySelector(".col-2").classList.add("nocalc")
}

document.getElementById('clearAll').addEventListener('click', clearAll);
