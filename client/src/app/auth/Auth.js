import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLogin } from "../../store/features/AuthReducer";
import image from "../../assets/bg.webp";
import { Modal } from "react-bootstrap";
import { createProfile } from "../../store/features/AuthReducer";
import styles from "./auth.css";
import { CameraAlt, Close } from "@mui/icons-material";
import { createSession, selectLogged } from "../../store/features/MainReducer";
import { useNavigate } from "react-router";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [userRegister, setUserRegister] = useState("");
  const [passRegister, setPassRegister] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [matchpass, setMatchpass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [modal, setModal] = useState(false);

  const [session, setSession] = useState(useSelector(selectLogged))

  console.log(session)

  // useEffect(() => {

  //   if(session === false){
  //     navigate('/auth')
  //   }else{
  //     navigate('/')
  //   }
  // },[session])
  

  const handleRegister = async () => {
    // e.preventDefault();

    const v1 = USER_REGEX.test(userRegister);
    const v2 = PWD_REGEX.test(passRegister);

    if (v1 && v2 === true) {
      if (passRegister === matchpass) {
        const body = {
          name: name,
          user: userRegister,
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

  const handleLogin = async () => {
    const body = {
      user: user,
      pass: pass,
    };
    await dispatch(createLogin(body));
  };

  const getBase64 = (file) => {
    const files = file[0];
    let reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = () => {
      setProfilePic(reader.result);
    };
  };

  console.log(profilePic)

  return (
    <>
      <div className="grid grid-cols-2 h-screen bg-main">
        <img src={image} className="h-screen object-cover" />
        <div className="flex items-center">
          <div className="p-20">
            <h1 className="text-7xl font-bold text-gray-200">Welcome!</h1>
            <h1 className="text-2xl text-gray-200 mt-5">
              Connect with the world right now!
            </h1>
            <div className="grid grid-cols-2 mt-10">
              <div className="">
                <input
                  type="text"
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="User"
                  className="bg-transparent border text-gray-200 border-gray-500 p-2 outline-none rounded-lg w-full focus:border-yellow-400"
                />
                <input
                  type="password"
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Password"
                  className="bg-transparent my-3 border text-gray-200 border-gray-500 p-2 outline-none rounded-lg w-full focus:border-yellow-400"
                />
                <button
                  type="submit"
                  onClick={handleLogin}
                  className="text-xl mt-3 mb-5 font-semibold bg-gradient-to-tr from-pink-700 to-orange-500 text-gray-200 px-4 py-2 rounded-3xl"
                >
                  SIGN IN
                </button>
                <h1 className="text-gray-200">
                  You are not registered yet?{" "}
                  <button
                    className="text-yellow-400 font-semibold"
                    onClick={() => setModal(true)}
                  >
                    Register
                  </button>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={modal} centered className="my-modal">
        <div className="m-5">
          <div className="flex flex-col items-end">
            <button onClick={() => setModal(false)}>
              <Close className="text-white" />
            </button>
          </div>
          <h1 className="text-4xl font-bold text-gray-200 mb-2">Register</h1>
          <h1 className="text-2xl text-gray-200 mb-4">It's easy and fast</h1>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent border text-gray-200 border-gray-500 p-2 outline-none rounded-lg w-full focus:border-yellow-400"
          />
          <input
            type="text"
            placeholder="User"
            onChange={(e) => setUserRegister(e.target.value)}
            className="my-3 bg-transparent border text-gray-200 border-gray-500 p-2 outline-none rounded-lg w-full focus:border-yellow-400"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassRegister(e.target.value)}
            className="bg-transparent border text-gray-200 border-gray-500 p-2 outline-none rounded-lg w-full focus:border-yellow-400"
          />
          <input
            type="password"
            placeholder="Confirm password"
            onChange={(e) => setMatchpass(e.target.value)}
            className="my-3 bg-transparent border text-gray-200 border-gray-500 p-2 outline-none rounded-lg w-full focus:border-yellow-400"
          />
          <label htmlFor="picture" className="text-gray-200 border-yellow-400  w-full text-center cursor-pointer p-2 rounded-lg">
            Select Image
            <CameraAlt className="ml-2" />
            <input
              type="file"
              onChange={(e) => getBase64(e.target.files)}
              accept="image/*"
              className="hidden"
              id="picture"
            />
          </label>
          <div className="flex flex-col">
            <button
              onClick={handleRegister}
              className=" mx-5 text-center text-xl mt-5 font-semibold bg-gradient-to-tr from-pink-700 to-orange-500 text-gray-200 px-4 py-2 rounded-3xl"
            >
              Register
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Auth;
