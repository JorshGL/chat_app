import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getSearch, selectLogged } from "../../../store/features/MainReducer";
import bg from "../../../assets/bg.webp";
import axios from "axios";
import api from "../../../constants/api";
import { Add, LocationSearching } from "@mui/icons-material";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [session, setSession] = useState(useSelector(selectLogged));
  const [searched, setSearched] = useState("");
  const [id, setId] = useState("");
  const [typing, setTyping] = useState(false);

  console.log(session);

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
    setTyping(true);
    clearTimeout(typingTimer);
  };

  const onKeyUp = () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(getSearch, 3000);
  };

  const getSearch = async () => {
    const URL = `${api.baseUrl}/${api.endpoints.users}/search/@${id}`;
    const res = await axios.get(URL, { withCredentials: true });
    try {
      return setSearched(res.data);
    } catch (err) {
      await dispatch();
      return false;
    }
  };

  return (
    <div className="bg-main h-screen grid grid-cols-3">
      <div className="border-r border-yellow-400">
        <div className="flex flex-row justify-between bg-neutral-800 p-3">
          <button className="rounded-full bg-yellow-400 h-12 w-12 p-0.5">
            <img src={bg} className="object-cover rounded-full" />
          </button>
          <button>
            <Add className="text-gray-200"/>
          </button>
        </div>
        <div>
          <input
            type="text"
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
      </div>
      <img src={bg} className="object-cover max-h-screen w-full col-span-2" />
    </div>
  );
};

export default Home;
