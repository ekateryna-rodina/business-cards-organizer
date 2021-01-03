import React from "react";
import Cards from "../../components/card/Cards";
import CardForm from "../../components/card/CardForm";
import { CardFilter } from "../card/CardFilter";
const Home = () => {
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
