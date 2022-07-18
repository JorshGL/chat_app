import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectLogged } from "../../../store/features/MainReducer";

const Home = () => {
  const navigate = useNavigate();

  const [session, setSession] = useState(useSelector(selectLogged));

  useEffect(() => {
    if (session === false) {
      navigate("/auth");
    } else {
      navigate("/");
    }
  }, []);

  return <div>Home</div>;
};

export default Home;
