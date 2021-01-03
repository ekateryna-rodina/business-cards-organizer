import React, { useState, useContext, useEffect } from "react";
import CardContext from "../../context/card/cardContext";

const CardForm = () => {
  const cardContext = useContext(CardContext);
  const { addCard, updateCard, current, clearCurrent } = cardContext;
  const [card, setCard] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });
  const { name, email, phone, type } = card;
  // on fields edit
  const onChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };
  // preload data
  useEffect(() => {
    if (current) {
      setCard(current);
    } else {
      setCard({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [current]);
  // on form submit
  const onSubmit = (e) => {
    e.preventDefault();
    if (!current) {
      addCard(card);
    } else {
      updateCard(card);
      clearCurrent();
    }
    setCard({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };
  // clear button handler
  const onClear = () => {
    clearCurrent();
  };
  return (
    <form onSubmit={onSubmit}>
      <h3 className="text-primary">{current ? "Edit card" : "Add a card"}</h3>
      <input
        type="text"
        name="name"
        value={name}
        placeholder="Name"
        onChange={onChange}
      />
      <input
        type="email"
        name="email"
        value={email}
        placeholder="Email"
        onChange={onChange}
      />
      <input
        type="text"
        name="phone"
        value={phone}
        placeholder="Phone"
        onChange={onChange}
      />
      <h5>Contact Type:</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional{" "}
      <div>
        <input
          type="submit"
          value={current ? "Edit card" : "Add a card"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <button className="btn btn-light btn-block" onClick={onClear}>
          Clear
        </button>
      )}
    </form>
  );
};

export default CardForm;
