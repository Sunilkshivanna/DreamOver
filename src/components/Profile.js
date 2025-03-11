import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { getDatabase, ref, set, get } from "firebase/database";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setPhoneNumber(user.phoneNumber);

      // Store user data in Firebase Database
      const db = getDatabase();
      set(ref(db, "users/" + user.uid), {
        phone: user.phoneNumber,
        createdAt: new Date().toISOString(),
      });
    } else {
      navigate("/");
    }
  }, [navigate]);

  const logout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div>
      <h2>Profile</h2>
      <p>Phone Number: {phoneNumber}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
