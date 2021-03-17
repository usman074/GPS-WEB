import { API_REQUEST_SUCCESS } from "../customHooks/apiCallHook";
import { API_REQUEST_FAILURE } from "../customHooks/apiCallHook";
import { API_REQUEST } from "../customHooks/apiCallHook";

export const initialState = {
  response: {},
  isLoading: false,
  error: "",
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case API_REQUEST:
      return {
        ...state,
        ...action.payload,
        isLoading: true,
      };

    case API_REQUEST_SUCCESS:
      return {
        ...state,
        ...action.payload.optionalState,
        response: action.payload.data,
        isLoading: false,
        error: null,
      };
    case API_REQUEST_FAILURE:
      return {
        ...state,
        response: null,
        isLoading: false,
        error: action.payload.response.data,
      };
    default:
      return state;
  }
}
