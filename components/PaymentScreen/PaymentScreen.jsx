import { useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import * as paymentApi from "../../services/paymentService";

const PaymentScreen = ({ setActivePaymentScreen, handleCreateOrder }) => {
  const initialState = {
    name: "",
    cardNumber: "",
    expMonth: "1",
    expYear: "2025",
    cvc: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("Trying to add a payment...");

      const paymentData = {
        expMonth: formData.expMonth,
        expYear: formData.expYear,
      };
      console.log("paymentData:", paymentData);

      const validPayment = await paymentApi.createPayment(paymentData);
      console.log("payment created?:", validPayment);

      if (validPayment) {
        handleCreateOrder();
        setFormData(initialState);
        setError("Payment successful! Taking you to order invoice...");
        // setActivePaymentScreen(false);
      } else {
        setError("Payment failed. Please try again.");
      }
    } catch (error) {
      console.log("Payment failed. Error:", error.message);
      setError("Payment failed. Please try again.");
    }
  };

  return (
    <section>
      <h2>Add Payment</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Cardholder name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cardNumber">Card number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            required
            placeholder="1111-2222-3333-4444"
          />
        </div>
        <label>Expiration date</label>
        <div>
          <label htmlFor="expMonth">Month</label>
          <select
            id="expMonth"
            name="expMonth"
            value={formData.expMonth}
            onChange={handleChange}
            required>
            <option value="1">January</option>
            <option value="2">Feburary</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <label htmlFor="expYear">Year</label>
          <select
            id="expYear"
            name="expYear"
            value={formData.expYear}
            onChange={handleChange}
            required>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
            <option value="2029">2030</option>
            <option value="2029">2031</option>
            <option value="2029">2032</option>
            <option value="2029">2033</option>
            <option value="2029">2034</option>
            <option value="2029">2035</option>
          </select>
        </div>
        <div>
          <label htmlFor="cvc">Security code</label>
          <input
            type="text"
            id="cvc"
            name="cvc"
            value={formData.cvc}
            onChange={handleChange}
            required
          />
        </div>
        <button>Place order</button>
      </form>
    </section>
  );
};

export default PaymentScreen;
