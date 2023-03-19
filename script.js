const loader = document.querySelector(".loader");
const selectCurrency = document.getElementById("currency");
const amountInput = document.getElementById("amount");
const convertButton = document.getElementById("convert");
const resultParagraph = document.getElementById("result");

convertButton.addEventListener("click", convertCurrency);

function convertCurrency() {
  const currencyCode = selectCurrency.value;
  const amount = amountInput.value;
  if (amount === "") {
    alert("Proszę wpisać kwotę");
    return;
  }

  loader.style.display = "block";
  fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${currencyCode}/today/`)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.rates[0].mid;
      const convertedAmount = amount * rate;
      resultParagraph.innerHTML = `${amount} ${currencyCode} = ${convertedAmount.toFixed(
        2
      )} PLN`;
      loader.style.display = "none";
    })
    .catch((error) => {
      alert("Błąd. Spróbuj ponownie później.");
      console.error(error);
      loader.style.display = "none";
    });
}
