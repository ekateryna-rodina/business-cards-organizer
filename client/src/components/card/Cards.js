import React, { Fragment, useContext, useEffect } from "react";
import CardContext from "../../context/card/cardContext";
import CardItem from "./CardItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AlertContext from "../../context/alert/alertContext";
import Spinner from "../layout/Spinner";

export const Cards = () => {
  const cardContext = useContext(CardContext);
  const alertContext = useContext(AlertContext);
  //   get data from the context
  const { cards, filtered, errors, getCards, loading } = cardContext;
  const { setAlert } = alertContext;
  // display errors
  useEffect(() => {
    console.log(errors);
    if (errors) {
      errors.forEach((e) => setAlert(e.msg, "danger"));
    }

    getCards();
    // eslint-ignore-next-line
  }, [errors]);
  if (cards !== null && cards.length === 0 && !loading) {
    return <h4>Please add a card</h4>;
  }

  return (
    <Fragment>
      {cards !== null && !loading ? (
        <TransitionGroup>
          {filtered
            ? filtered.map((card) => (
                <CSSTransition key={card._id} timeout={500} classNames="item">
                  <CardItem card={card} />
                </CSSTransition>
              ))
            : cards.map((card) => (
                <CSSTransition key={card._id} timeout={500} classNames="item">
                  <CardItem card={card} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};
export default Cards;
