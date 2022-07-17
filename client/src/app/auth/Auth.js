import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createLogin } from "../../store/features/AuthReducer";

const Auth = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = async () => {
    const body = {
      user: user,
      pass: pass,
    };
    await dispatch(createLogin(body));
  };

  return (
    <>
      <input type="text" onChange={(e) => setUser(e.target.value)} />
      <input type="password" onChange={(e) => setPass(e.target.value)} />
      <button type="submit" onClick={handleSubmit}>
        test
      </button>
    </>
  );
};

export default Auth;
