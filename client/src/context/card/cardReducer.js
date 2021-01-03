import {
  ADD_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

export default (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, action.payload],
      };
    case DELETE_CARD:
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.payload),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case UPDATE_CARD:
      return {
        ...state,
        cards: state.cards.map((card) =>
          card.id === action.payload.id ? action.payload : card
        ),
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.cards.filter((card) => {
          const pattern = new RegExp(`${action.payload}`, "gi");
          return card.name.match(pattern) || card.email.match(pattern);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    default:
      return state;
  }
};
