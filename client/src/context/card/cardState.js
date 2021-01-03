import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import CardContext from "./cardContext";
import CardReducer from "./cardReducer";
import {
  ADD_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../../context/types";

const CardState = (props) => {
  const initialState = {
    cards: [
      {
        id: 1,
        name: "name",
        email: "email@gmail.com",
        phone: "7890",
        type: "personal",
      },
      {
        id: 2,
        name: "name",
        email: "email@gmail.com",
        phone: "7890",
        type: "personal",
      },
      {
        id: 3,
        name: "name",
        email: "email@gmail.com",
        phone: "7890",
        type: "professional",
      },
    ],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(CardReducer, initialState);

  // add card
  const addCard = (card) => {
    card.id = uuid();
    dispatch({ type: ADD_CARD, payload: card });
  };
  //   delete card
  const deleteCard = (id) => {
    dispatch({ type: DELETE_CARD, payload: id });
  };

  // set current card
  const setCurrent = (card) => {
    dispatch({ type: SET_CURRENT, payload: card });
  };

  // clear current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // update card
  const updateCard = (card) => {
    dispatch({ type: UPDATE_CARD, payload: card });
  };
  // filter cards
  const setFilter = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <CardContext.Provider
      value={{
        cards: state.cards,
        current: state.current,
        filtered: state.filtered,
        addCard,
        deleteCard,
        setCurrent,
        clearCurrent,
        updateCard,
        setFilter,
        clearFilter,
      }}
    >
      {props.children}
    </CardContext.Provider>
  );
};

export default CardState;
