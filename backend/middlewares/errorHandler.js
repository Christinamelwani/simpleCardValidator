function errorHandler(err, req, res, next) {
  let code = 500;
  let name = "Internal server error";
  let message = "Hmm, server unresponsive";
  if (err.name === "Missing input") {
    code = 400;
    message = err.message;
    name = "Missing input";
  }
  if (err.name === "Invalid data entered") {
    code = 400;
    message = err.message;
    name = "Invalid data entered, please check again";
  }
  res.status(code).json({ status: "Failed", name, message });
}

module.exports = { errorHandler };
