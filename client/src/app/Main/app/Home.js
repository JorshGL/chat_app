import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getSearch, selectLogged } from "../../../store/features/MainReducer";
import bg from "../../../assets/bg.webp";
import axios from "axios";
import api from "../../../constants/api";
import { Add } from "@mui/icons-material";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [session, setSession] = useState(useSelector(selectLogged));
  const [searched, setSearched] = useState([""]);
  const [id, setId] = useState("");
  const [typing, setTyping] = useState(false);

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
    typingTimer = setTimeout(getSearch, 1000);
  };

  const getSearch = async () => {
    const URL = `${api.baseUrl}/${api.endpoints.users}/search/@${id}`;
    const res = await axios.get(URL);
    if (id !== "") {
      try {
        return setSearched(res.data);
      } catch (err) {
        await dispatch();
        return false;
      }
    }
  };

  const planA = (e) => {
    setId(e.target.value);
    setSearched([""]);
  };

  console.log(session);
  console.log(searched);

  return (
    <div className="bg-main h-screen grid grid-cols-3">
      <div className="border-r border-yellow-400">
        <div className="flex flex-row justify-between items-center bg-neutral-800 p-3">
          <button className="rounded-full bg-yellow-400 h-12 w-12 p-0.5">
            <img src={bg} className="object-cover rounded-full" />
          </button>
          <h1 className="text-white font-bold text-2xl">chatapp</h1>
          <button className="h-10 w-10">
            <Add className="text-gray-200" />
          </button>
        </div>
        <div>
          <div className="flex flex-col">
            <input
              type="text"
              onKeyUp={onKeyUp}
              onKeyDown={onKeyDown}
              onChange={planA}
              className="m-2 bg-transparent border text-gray-200 border-gray-500 p-2 outline-none rounded-lg focus:border-yellow-400"
            />
          </div>
        </div>
        <div className="px-2">
          {id === "" && <div className="text-white">Digita un valor</div>}
          {searched && (
            <div>
              {searched.map((item) => (
                <div className="text-white" key={item.user}>
                  <h1>{item.user}</h1>
                </div>
              ))}
            </div>
          )}
          {searched.length === 0 && id !== "" && (
            <h1 className="text-white">No se encontró el usuario</h1>
          )}
        </div>
      </div>
      <img src={bg} className="object-cover max-h-screen w-full col-span-2" />
    </div>
  );
};

export default Home;
