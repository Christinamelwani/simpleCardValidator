const {
  validateInput,
  checkExpiryDate,
  checkCardNumber,
  checkSecurityCode,
  luhnsAlgorithmChecker,
} = require("../helpers/helpers");
class Controller {
  static validateCreditCard(req, res, next) {
    try {
      let { month, year, cardNumber, cvv, cardType } = req.body;
      let expirationDate = { month, year };
      let missingInput = validateInput(
        expirationDate,
        cardNumber,
        cvv,
        cardType
      );
      if (missingInput.length !== 0) {
        throw {
          name: "Missing input",
          message: missingInput.join(`\n`),
        };
      }

      if (!checkExpiryDate(expirationDate)) {
        throw {
          name: "Invalid data entered",
          message: "The card's expiry date is in the past",
        };
      }
      if (!checkSecurityCode(cvv, cardType)) {
        throw {
          name: "Invalid data entered",
          message: "The security code is invalid",
        };
      }
      if (!checkCardNumber(cardNumber) || !luhnsAlgorithmChecker(cardNumber)) {
        throw {
          name: "Invalid data entered",
          message: "The card number is invalid",
        };
      }
      res.status(200).json({
        status: "Success",
        message: "Credit card successfully validated",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
