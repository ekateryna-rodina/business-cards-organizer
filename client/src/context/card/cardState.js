import React, { useReducer } from "react";
import CardContext from "./cardContext";
import CardReducer from "./cardReducer";
import axios from "axios";
import {
  ADD_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CARD_FAIL,
  GET_CARDS,
  CLEAR_CARDS,
} from "../../context/types";

const CardState = (props) => {
  const initialState = {
    cards: null,
    current: null,
    filtered: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(CardReducer, initialState);

  //get all cards
  const getCards = async () => {
    try {
      const res = await axios.get("/api/cards/");
      dispatch({ type: GET_CARDS, payload: res.data });
    } catch (error) {
      dispatch({ type: CARD_FAIL, payload: error.response.data.errors });
    }
  };
  // add card
  const addCard = async (card) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/cards/", card, config);
      dispatch({ type: ADD_CARD, payload: res.data });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: CARD_FAIL, payload: error.response.data.errors });
    }
  };
  //   delete card
  const deleteCard = async (id) => {
    try {
      await axios.delete(`/api/cards/${id}`);
      dispatch({ type: DELETE_CARD, payload: id });
    } catch (error) {
      dispatch({ type: CARD_FAIL, payload: error.response.data.errors });
    }
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
  const updateCard = async (card) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(`/api/cards/${card._id}`, card, config);
      dispatch({ type: UPDATE_CARD, payload: res.data });
    } catch (error) {
      dispatch({ type: CARD_FAIL, payload: error.response.data.errors });
    }
  };
  // filter cards
  const setFilter = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  // clear cards state
  const clearCards = () => dispatch({ type: CLEAR_CARDS });
  return (
    <CardContext.Provider
      value={{
        cards: state.cards,
        current: state.current,
        filtered: state.filtered,
        errors: state.errors,
        loading: state.loading,
        addCard,
        deleteCard,
        setCurrent,
        clearCurrent,
        updateCard,
        setFilter,
        clearFilter,
        getCards,
        clearCards,
      }}
    >
      {props.children}
    </CardContext.Provider>
  );
};

export default CardState;
