import { useReducer } from "react";

const ACTIONS = {
    FETCH_INIT: "FETCH_INIT",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_FAILURE: "FETCH_FAILURE",
};

function reducer(state: any, action: any) {
    switch (action.type) {
        case ACTIONS.FETCH_INIT:
            return {
                isError: false,
                isLoading: true,
            };
        case ACTIONS.FETCH_SUCCESS:
            return {
                data: action.payload,
                isError: false,
                isLoading: false,
            };
        case ACTIONS.FETCH_FAILURE:
            return {
                isError: true,
                isLoading: false,
            };
        default:
            return state;
    }
}

export function useFetch(url: string, options = {}) {
    const [state, dispatch] = useReducer(reducer, {
        isError: false,
        isLoading: true,
    });

    function doFetch(queryParams: Record<string, any> = {}) {
        dispatch({ type: ACTIONS.FETCH_INIT });

        // Construir la URL con los parámetros de consulta
        const queryString = new URLSearchParams(queryParams).toString();
        const fullUrl = queryString ? `${url}?${queryString}` : url;

        fetch(fullUrl, { ...options })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Error al realizar la petición");
            })
            .then((data) => {
                dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data });
            })
            .catch(() => {
                dispatch({ type: ACTIONS.FETCH_FAILURE });
            });
    }

    return [state, doFetch];
}
