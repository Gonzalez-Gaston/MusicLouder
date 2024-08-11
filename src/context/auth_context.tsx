import { createContext, useReducer, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext({
    state: {},
    actions: {},
});

const ACTIONS = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
};



function reducer(state: any, action: any) {
    switch (action.type) {
        case ACTIONS.LOGIN:
            localStorage.setItem("authToken", action.payload);
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isAuthenticated: true,
            };
        case ACTIONS.LOGOUT:
            return {
                isAuthenticated: false,
                token: null,
                user: null,
            };
        default:
            return state;
    }
}

export function AuthProvider({ children }: any) {
    const [state, dispatch] = useReducer(reducer, {
        isAuthenticated: false,
    });
    const navigate = useNavigate();
    const location = useLocation();

    const actions = {
        login: async (token: string) => {
            dispatch({ type: ACTIONS.LOGIN, payload: { token, user: null } });
    
            try {
                const response = await fetch("https://sandbox.academiadevelopers.com/users/profiles/profile_data/", {
                    method: "GET",
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                if (response.ok) {
                    const userData = await response.json();
                    console.log(userData)
                    dispatch({ type: ACTIONS.LOGIN, payload: { token, user: userData } });
                } else {
                    // Manejo de errores si la solicitud falla
                    dispatch({ type: ACTIONS.LOGOUT });
                }
            } catch (error) {
                // Manejo de errores si la solicitud falla
                console.error("Error fetching user data:", error);
                dispatch({ type: ACTIONS.LOGOUT });
            }
    
            const origin = location.state?.from?.pathname || "/";
            navigate(origin);
        },
        logout: () => {
            dispatch({ type: ACTIONS.LOGOUT });
            navigate("/");
        },
    };

    return (
        <AuthContext.Provider value={{ state, actions }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(type: "state" | "actions") {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context[type];
}