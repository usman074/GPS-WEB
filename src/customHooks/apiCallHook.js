import { useReducer } from "react";
import http from "../services/httpService";
import { reducer, initialState } from "../reducers";

export const API_REQUEST = "API_REQUEST";
export const API_REQUEST_SUCCESS = "API_REQUEST_SUCCESS";
export const API_REQUEST_FAILURE = "API_REQUEST_FAILURE";

function useApiCall(state = {}) {
  const [State, dispatch] = useReducer(reducer, {
    ...initialState,
    ...state,
  });

  const callApi = async (obj, requestState = null, optionalState = null) => {
    const { url, options, payload } = obj;

    if (typeof obj === "undefined") {
      return null;
    }

    if (!obj.meta || obj.meta.type !== "api") {
      return null;
    }
    let response;
    if (options.method === "get") {
      try {
        const requestAction = {
          type: API_REQUEST,
          payload: requestState,
        };
        dispatch(requestAction);
        response = await http.axios({
          method: options.method,
          headers: options.headers ? options.headers : null,
          url: url,
        });
        response = { ...response, optionalState };
        const newAction = {
          type: API_REQUEST_SUCCESS,
          payload: response,
        };
        dispatch(newAction);
      } catch (error) {
        const newAction = {
          type: API_REQUEST_FAILURE,
          payload: error,
        };
        dispatch(newAction);
      }
    } else {
      try {
        response = await http.axios({
          method: options.method,
          headers: options.headers ? options.headers : null,
          url: url,
          data: payload,
        });
        const newAction = {
          type: API_REQUEST_SUCCESS,
          payload: response,
        };
        dispatch(newAction);
      } catch (error) {
        const newAction = {
          type: API_REQUEST_FAILURE,
          payload: error,
        };
        dispatch(newAction);
      }
    }
  };

  return [State, callApi];
}

export default useApiCall;
