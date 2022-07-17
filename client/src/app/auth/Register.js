import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProfile } from "../../store/features/RegisterReducer";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const Register = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [matchpass, setMatchpass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const getBase64 = (file) => {
    const files = file[0];
    let reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = () => {
      setProfilePic(reader.result);
    };
  };

  const handleSubmit = async () => {
    // e.preventDefault();

    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pass);

    if (v1 && v2 === true) {
      if (pass === matchpass) {
        const body = {
          name: name,
          user: user,
          pass: matchpass,
          profile_pic: profilePic,
        };
        await dispatch(createProfile(body));
      } else {
        console.log("Las contras no coinciden");
      }
    } else {
      console.log("Las vainosas no están bien");
    }
  };

  return (
    <>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <input type="text" onChange={(e) => setUser(e.target.value)} />
      <input type="password" onChange={(e) => setPass(e.target.value)} />
      <input type="password" onChange={(e) => setMatchpass(e.target.value)} />
      <input type="file" onChange={(e) => getBase64(e.target.files)} />

      <button onClick={handleSubmit}>Test</button>
    </>
  );
};

export default Register;
