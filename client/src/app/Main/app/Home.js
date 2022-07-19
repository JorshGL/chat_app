import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getSearch, selectLogged } from "../../../store/features/MainReducer";
import bg from "../../../assets/bg.webp";
import axios from "axios";
import api from "../../../constants/api";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [session, setSession] = useState(useSelector(selectLogged));
  const [searched, setSearched] = useState("");
  const [id, setId] = useState("")
  const [typing, setTyping] = useState(false)

  console.log(searched);

  // useEffect(() => {
  //   if (session === false) {
  //     navigate("/auth");
  //   } else {
  //     navigate("/");
  //   }
  // }, []);

  let typingTimer;

  const onKeyDown = () => {
    clearTimeout(typingTimer);
  };

  const onKeyUp = () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(getSearch, 3000);
  };

  const getSearch = async () => {
    const URL = `${api.baseUrl}/${api.endpoints.users}/search/@${id}`;
    const res = await axios.get(URL);
    try {
      return setSearched(res.data);
    } catch (err) {
      await dispatch();
      return false;
    }
  };

  return (
    <div className="bg-main h-screen grid grid-cols-3">
      <div>
        <input type="text" onKeyUp={onKeyUp} onKeyDown={onKeyDown} onChange={(e) => setId(e.target.value)} />
      </div>
      <img src={bg} className="object-cover w-full col-span-2" />
    </div>
  );
};

export default Home;
