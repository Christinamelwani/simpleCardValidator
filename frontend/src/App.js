import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
function App() {
  const [cardInfo, setCardInfo] = useState({
    cardType: "",
    cvv: 0,
    cardNumber: 0,
    month: 9,
    nameOnCard: "",
    year: 2022,
  });

  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const yearsArray = [];
  for (let i = 0; i < 3000; i++) {
    yearsArray.push(i);
  }

  function handleCardTypeChange(e) {
    e.preventDefault();

    const cardSelectors = document.getElementsByClassName("scale-125");
    for (const selector of cardSelectors) {
      console.log(selector);
      selector.classList.remove("scale-125");
      selector.classList.add("scale-100");
    }
    e.target.classList.remove("scale-100");
    e.target.classList.add("scale-125");
    console.log(e.target.name);
    setCardInfo({
      ...cardInfo,
      cardType: e.target.name,
    });
  }
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCardInfo({
      ...cardInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(cardInfo);
  };

  const submit = async (cardInfo) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/validate-card-details",
        cardInfo
      );
      console.log(response);
      swal({
        title: "Success!",
        text: "Card successfully validated, thanks for your payment",
        icon: "success",
      });
    } catch (err) {
      let error = err.response.data;
      swal({
        title: error.name,
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <form className="flex flex-col px-40 py-12">
      <div className="flex-outer px-4 py-6  flex flex-col bg-primary-content rounded items-between gap-2 text-primary">
        <div className="text-3xl self-center">Enter your card details:</div>
        <div className="flex flex-row justify-between px-10 py-2">
          <div>
            <label htmlFor="name" className="text-lg">
              Name on card:
            </label>
            <input
              value={cardInfo.nameOnCard}
              type="text"
              name="nameOnCard"
              placeholder="John Smith"
              className="input input-bordered input-primary w-full text-primary-content"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="cvv" className="text-lg">
              CVV:
            </label>
            <input
              name="cvv"
              onChange={handleChange}
              value={cardInfo.cvv}
              type="text"
              placeholder="Type here"
              className="input text-primary-content input-bordered input-primary w-full max-w-xs"
            />
          </div>
        </div>
        <div className="flex flex-col px-10 py-2 w-[60%]">
          <label htmlFor="cardNumber" className="text-lg">
            Card Number:
          </label>
          <input
            name="cardNumber"
            onChange={handleChange}
            value={cardInfo.cardNumber}
            type="text"
            placeholder="Number on card"
            className="input text-primary-content input-bordered input-primary w-full"
          />
        </div>
        <div className="flex flex-row px-10 py-2 justify-between">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg">
              Expiration Date:
            </label>
            <div className="flex flex-row gap-5 text-primary-content">
              <select
                className="select select-bordered w-full max-w-xs"
                name="month"
                onChange={handleChange}
                value={cardInfo.month}
              >
                <option disabled>Month</option>
                {monthsArray.map((month, i) => {
                  return (
                    <option value={i + 1} key={i}>
                      {month}
                    </option>
                  );
                })}
              </select>

              <select
                name="year"
                className="select select-bordered text-primary-content"
                onChange={handleChange}
                value={cardInfo.year}
              >
                <option disabled>Year</option>
                {yearsArray.map((year, i) => {
                  return (
                    <option value={i} key={i}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex flex-row px-10 py-2 gap-2">
            <button
              className="cardTypeSelector"
              name="Visa cardTypeSelector"
              onClick={handleCardTypeChange}
            >
              <img
                name="Visa"
                src="https://cdn-icons-png.flaticon.com/512/349/349221.png"
                id="Visa"
                className="h-20 cursor-pointer"
              ></img>
            </button>
            <button
              name="American Express"
              onClick={handleCardTypeChange}
              className="scale-100 cardTypeSelector"
            >
              <img
                name="American Express"
                src="https://cdn-icons-png.flaticon.com/512/349/349228.png"
                id="American Express"
                className="h-20 cursor-pointer"
              ></img>
            </button>
            <button
              name="Mastercard"
              onClick={handleCardTypeChange}
              className="scale-100 cardTypeSelector"
            >
              <img
                name="Mastercard"
                src="https://cdn3.iconfinder.com/data/icons/payment-method-1/64/_Mastercard-512.png"
                id="Master Card"
                className="h-20 cursor-pointer"
              ></img>
            </button>
          </div>
        </div>
        <div className="form-group px-10 self-start py-2 w-full" id="pay-now">
          <button
            type="submit"
            className="btn btn-default w-full"
            id="confirm-purchase"
            onClick={handleSubmit}
          >
            Confirm
          </button>
        </div>
      </div>
    </form>
  );
}

export default App;
