import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import * as paymentApi from "../../services/paymentService";
import "./PaymentScreen.css";

const PaymentScreen = ({ setActivePaymentScreen, handleCreateOrders }) => {
  const navigate = useNavigate();
  const initialState = {
    name: "",
    cardNumber: "",
    expMonth: "1",
    expYear: "2025",
    cvc: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (loading) return; // prevent double submit
      setLoading(true);

      const paymentData = {
        expMonth: formData.expMonth,
        expYear: formData.expYear,
      };
      const validPayment = await paymentApi.createPayment(paymentData);

      if (validPayment) {
        // Pass payment.id from validPayment to handleCreateOrder()
        await handleCreateOrders(validPayment.id);
        // artificial buffering / loading delay so user sees processing
        await new Promise((res) => setTimeout(res, 2000));

        setFormData(initialState);
        setActivePaymentScreen(false);
        setLoading(false);
        navigate("/dashboard/orders");
      } else {
        setError("Payment failed. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      setError("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="modal is-active" role="dialog" aria-modal="true">
      <div
        className="modal-background"
        onClick={() => {
          setFormData(initialState);
          setActivePaymentScreen(false);
        }}
      />

      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <header className="modal-card-head">
          <p className="modal-card-title">
            Add Payment <i className="fa-solid fa-credit-card"></i>
          </p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => {
              setFormData(initialState);
              setActivePaymentScreen(false);
            }}></button>
        </header>

        <form onSubmit={handleSubmit}>
          <section className="modal-card-body">
            <div className="credit-card-logos">
              <img src="/images/cc/visa.png" alt="Visa" />
              <img src="/images/cc/mastercard.png" alt="Mastercard" />
              <img src="/images/cc/aexpress.png" alt="American Express" />
            </div>

            {error && (
              <div
                style={{ maxWidth: 265 }}
                className="notification is-danger is-light p-2"
                role="alert"
                aria-live="polite">
                {error}
              </div>
            )}

            <div className="field">
              <label className="label" htmlFor="name">
                Cardholder name
              </label>
              <input
                className="input long-input"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="field">
              <label className="label" htmlFor="cardNumber">
                Card number
              </label>
              <input
                className="input long-input"
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                placeholder="1111-2222-3333-4444"
                disabled={loading}
              />
            </div>
            <div className="field columns">
              <div className="column">
                <label className="label" htmlFor="expMonth">
                  Month
                </label>
                <div className="select">
                  <select
                    id="expMonth"
                    name="expMonth"
                    value={formData.expMonth}
                    onChange={handleChange}
                    required
                    disabled={loading}>
                    <option value="1">January</option>
                    <option value="2">February</option>
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
                </div>
              </div>
              <div className="column">
                <label className="label" htmlFor="expYear">
                  Year
                </label>
                <div className="select">
                  <select
                    id="expYear"
                    name="expYear"
                    value={formData.expYear}
                    onChange={handleChange}
                    required
                    disabled={loading}>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                    <option value="2031">2031</option>
                    <option value="2032">2032</option>
                    <option value="2033">2033</option>
                    <option value="2034">2034</option>
                    <option value="2035">2035</option>
                  </select>
                </div>
              </div>
              <div className="column">
                <label className="label" htmlFor="cvc">
                  Security code
                </label>
                <input
                  className="input small-input"
                  type="text"
                  id="cvc"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </section>

          <footer className="modal-card-foot">
            <button
              type="submit"
              className={`button is-black mr-3 ${loading ? "is-loading" : ""}`}
              disabled={loading}>
              Place order
            </button>
            <button
              type="button"
              className="button is-light"
              onClick={() => {
                setFormData(initialState);
                setActivePaymentScreen(false);
              }}
              disabled={loading}>
              Cancel
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;
