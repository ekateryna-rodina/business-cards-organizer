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
} from "../types";

export default (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case GET_CARDS:
      return {
        ...state,
        cards: action.payload,
        loading: false,
      };
    case ADD_CARD:
      return {
        ...state,
        cards: [action.payload, ...state.cards],
        loading: false,
      };
    case DELETE_CARD:
      return {
        ...state,
        cards: state.cards.filter((card) => card._id !== action.payload),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    case CARD_FAIL:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
        loading: false,
      };
    case UPDATE_CARD:
      return {
        ...state,
        cards: state.cards.map((card) =>
          card._id === action.payload._id ? action.payload : card
        ),
        loading: false,
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.cards.filter((card) => {
          const pattern = new RegExp(`${action.payload}`, "gi");
          return card.name.match(pattern) || card.email.match(pattern);
        }),
        loading: false,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
        loading: false,
      };
    case CLEAR_CARDS:
      return {
        ...state,
        cards: null,
        filtered: null,
        errors: null,
        current: null,
      };
    default:
      return state;
  }
};
