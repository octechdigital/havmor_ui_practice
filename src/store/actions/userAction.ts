import { Dispatch } from "redux";
import { CLEAR_USER_DETAILS, SET_USER_DETAILS } from "../types";

export const setUserDetails = (payload: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: SET_USER_DETAILS,
    payload,
  });
};

export const clearUserDetails = () => async (dispatch: Dispatch) => {
  dispatch({
    type: CLEAR_USER_DETAILS,
  });
};
