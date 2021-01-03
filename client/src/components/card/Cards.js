import React, { Fragment, useContext } from "react";
import CardContext from "../../context/card/cardContext";
import CardItem from "./CardItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export const Cards = () => {
  const cardContext = useContext(CardContext);
  //   get data from the context
  const { cards, filtered } = cardContext;
  if (cards.length === 0) {
    return <h4>Please add a card</h4>;
  }
  return (
    <Fragment>
      <TransitionGroup>
        {filtered
          ? filtered.map((card) => (
              <CSSTransition key={card.id} timeout={500} classNames="item">
                <CardItem card={card} />
              </CSSTransition>
            ))
          : cards.map((card) => (
              <CSSTransition key={card.id} timeout={500} classNames="item">
                <CardItem card={card} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};
export default Cards;
