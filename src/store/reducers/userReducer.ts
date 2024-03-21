import { CLEAR_USER_DETAILS, SET_USER_DETAILS } from "../types";

export interface UserReducerStore {
  name: string;
  email: string;
  mobile: string;
}

const initialState: UserReducerStore = {
  name: "",
  mobile: "",
  email: "",
};

type ActionType =
  | {
      type: "SET_USER_DETAILS";
      payload: {
        name: string;
        email: string;
        mobile: string;
      };
    }
  | {
      type: "CLEAR_USER_DETAILS";
    };

export default function userReducer(state = initialState, action: ActionType) {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_USER_DETAILS:
      return {
        name: "",
        mobile: "",
        email: "",
      };
    default:
      return state;
  }
}
