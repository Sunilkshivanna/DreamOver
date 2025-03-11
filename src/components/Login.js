import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, onAuthStateChanged } from "firebase/auth";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if user is already logged in
  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate("/dashboard"); // Auto-redirect if already logged in
    }
  });

  const sendOtp = async () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
      const confirmationResult = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmation(confirmationResult);
      alert("OTP sent successfully!");
    } catch (err) {
      setError("Failed to send OTP. Check phone number format.");
    }
  };

  const verifyOtp = async () => {
    try {
      const result = await confirmation.confirm(otp);
      alert("Phone number verified successfully!");
      navigate("/dashboard"); // Redirect after successful login
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div>
      <h2>Phone Login</h2>
      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" />
      <button onClick={sendOtp}>Send OTP</button>

      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
      <button onClick={verifyOtp}>Verify OTP</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Login;
