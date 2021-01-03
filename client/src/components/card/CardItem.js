import React, { useContext } from "react";
import PropTypes from "prop-types";
import CardContext from "../../context/card/cardContext";

const CardItem = ({ card }) => {
  const { id, name, email, phone, type } = card;
  const cardContext = useContext(CardContext);
  const { deleteCard, setCurrent, clearCurrent } = cardContext;
  const onDelete = () => {
    deleteCard(id);
    clearCurrent(card);
  };
  const onEdit = () => {
    setCurrent(card);
  };
  return (
    <div className="card bg-light">
      <div className="text-dark text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
        <ul className="list">
          {email && (
            <li>
              <i className="fas fa-envelope-open" /> {email}
            </li>
          )}
          {phone && (
            <li>
              <i className="fas fa-phone" /> {phone}
            </li>
          )}
        </ul>
        <p>
          <button className="btn btn-primary btn-small" onClick={onEdit}>
            Edit
          </button>
          <button className="btn btn-dark btn-small" onClick={onDelete}>
            Delete
          </button>
        </p>
      </div>
    </div>
  );
};

CardItem.propTypes = {
  card: PropTypes.object.isRequired,
};

export default CardItem;
