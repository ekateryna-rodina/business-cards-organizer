import React, { useContext, useEffect } from "react";
import Cards from "../../components/card/Cards";
import CardForm from "../../components/card/CardForm";
import { CardFilter } from "../card/CardFilter";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="grid-2">
      <div>
        <CardForm />
      </div>
      <div>
        <CardFilter />
        <Cards />
      </div>
    </div>
  );
};

export default Home;
