const INITIAL_STATE = [];

export const LOAD_ALL_TASKS = "LOAD_ALL_TASKS";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const ADD_ITEM = "ADD_ITEM";

export const taskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOAD_ALL_TASKS":
      return action.payload;
    case "UPDATE_ITEM":
      const currentItem = state.findIndex((item) => {
        return item.id === action.payload.id;
      });
      let newState = [...state];
      newState[currentItem] = action.payload;
      return newState;

    case "DELETE_ITEM":
      console.log("id", action.payload);
      return state.filter((item) => item.id !== action.payload);

    case "ADD_ITEM":
      return [...state, action.payload];

    default:
      return state;
  }
};
