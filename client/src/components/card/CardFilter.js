import React, { useContext, useRef, useEffect } from "react";
import CardContext from "../../context/card/cardContext";

export const CardFilter = () => {
  const cardContext = useContext(CardContext);
  const { setFilter, clearFilter, filtered } = cardContext;
  const text = useRef("");

  //   clear filter
  useEffect(() => {
    if (!filtered) {
      text.current.value = "";
    }
  });
  const onChangeFilter = (e) => {
    if (e.target.value !== "") {
      setFilter(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter your cards..."
        onChange={onChangeFilter}
      />
    </form>
  );
};
