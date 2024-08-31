// Exchange rates for different currencies relative to each other
const exchangeRates = {
  USD: { EUR: 0.9, GBP: 0.76, JPY: 144.7, AUD: 1.48, PKR: 278.64 },
  EUR: { USD: 1.11, GBP: 0.84, JPY: 160.84, AUD: 1.64, PKR: 308.89 },
  GBP: { USD: 1.32, EUR: 1.19, JPY: 190.81, AUD: 1.94, PKR: 366.76 },
  JPY: { USD: 0.0069, EUR: 0.0062, GBP: 0.0052, AUD: 0.01, PKR: 1.92 },
  AUD: { USD: 0.68, EUR: 0.61, GBP: 0.51, JPY: 98.08, PKR: 189.38 },
  PKR: { USD: 0.0036, EUR: 0.0032, GBP: 0.0027, JPY: 0.52, AUD: 0.0053 },
};

document.getElementById("converter-form").addEventListener("input", convertCurrency);
document.getElementById("swap-btn").addEventListener("click", swapCurrencies);

// Function to handle currency conversion
function convertCurrency() {
  const amountInput = document.getElementById("amount");
  const amount = amountInput.value.trim();
  const fromCurrency = document.getElementById("from-currency").value;
  const toCurrency = document.getElementById("to-currency").value;
  const resultElement = document.getElementById("result");

  // Clear previous error messages
  resultElement.classList.remove("error");

  // If the amount input is empty, hide the error message and clear the result
  if (amount === "") {
    resultElement.innerText = "Converted Amount: ";
    return;
  }

  // Updated regex to match numbers with any number of decimal places
  const numberRegex = /^\d+(\.\d+)?$/;

  // Validate the amount input using regex
  if (!numberRegex.test(amount) || parseFloat(amount) <= 0) {
    resultElement.classList.add("error");
    resultElement.innerText =
      "Please enter a valid positive number greater than zero";
    return;
  }

  const parsedAmount = parseFloat(amount); // Parse the amount to a float

  // If the from and to currencies are the same, no conversion is needed
  if (fromCurrency === toCurrency) {
    resultElement.innerText = `Converted Amount: ${parsedAmount.toFixed(2)} ${toCurrency}`;
    return;
  }

  const rate = exchangeRates[fromCurrency][toCurrency];
  const convertedAmount = (parsedAmount * rate).toFixed(2);
  // Display the converted amount in the result element
  resultElement.innerText = `Converted Amount: ${convertedAmount} ${toCurrency}`;
}

// Function to reset the form inputs and result
function swapCurrencies() {
  const fromCurrencySelect = document.getElementById("from-currency");
  const toCurrencySelect = document.getElementById("to-currency");

  const tempCurrency = fromCurrencySelect.value;
  fromCurrencySelect.value = toCurrencySelect.value;
  toCurrencySelect.value = tempCurrency;

  // Trigger the conversion calculation after the swap
  convertCurrency();
}

// Function to reset the form inputs and result
function resetForm() {
  document.getElementById("amount").value = "";
  document.getElementById("from-currency").value = "USD";
  document.getElementById("to-currency").value = "EUR";
  document.getElementById("result").innerText = "Converted Amount: ";
}
