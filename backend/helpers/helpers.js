function checkExpiryDate(expirationDate) {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth() + 1;
  if (expirationDate.year < currentYear) {
    return false;
  }
  if (
    expirationDate.year === currentYear &&
    expirationDate.month <= currentMonth
  ) {
    return false;
  }
  return true;
}

function checkSecurityCode(code, cardType) {
  let codeAsString = code.toString();
  let digits = codeAsString.length;
  if (cardType === "American Express" && digits !== 4) {
    return false;
  }
  if (
    cardType === "American Express" &&
    +codeAsString.slice(0, 2) !== 34 &&
    +codeAsString.slice(0, 2) !== 37
  ) {
    return false;
  }
  if (cardType !== "American Express" && digits !== 3) {
    return false;
  }
  return true;
}

function checkCardNumber(cardNumber) {
  let cardNumberAsString = cardNumber.toString();
  let digits = cardNumberAsString.length;
  if (digits < 16 || digits > 19) {
    return false;
  }
  return true;
}

function luhnsAlgorithmChecker(cardNumber) {
  let check = 0;
  let digit = [];

  for (let i = 0; i < 16; i++) {
    digit[i] = cardNumber % 10;
    cardNumber = Math.floor(cardNumber / 10);
  }

  for (let i = 0; i < 16; i += 2) {
    check = check + digit[i];
  }

  for (let i = 1; i < 16; i += 2) {
    if (digit[i] * 2 < 10) {
      check = check + digit[i] * 2;
    } else {
      check = check + Math.floor((digit[i] * 2) / 10);
      check = check + ((digit[i] * 2) % 10);
    }
  }

  if (check % 10 !== 0) {
    return false;
  }

  return true;
}

function validateInput(expirationDate, cardNumber, cvv, cardType) {
  let errors = [];
  if (!expirationDate) {
    errors.push("You must enter an expiration date");
  }
  if (!cardType) {
    errors.push("You must enter a card type");
  }
  if (!cardNumber) {
    errors.push("You must enter a card number");
  }
  if (!cvv) {
    errors.push("You must enter a cvv");
  }
  return errors;
}

module.exports = {
  checkExpiryDate,
  checkCardNumber,
  checkSecurityCode,
  luhnsAlgorithmChecker,
  validateInput,
};
