import { createContext, useReducer, useContext, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  // otros campos que puedas necesitar
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
}

interface AuthContextType {
  state: AuthState;
  actions: {
    login: (token: string) => Promise<void>;
    logout: () => void;
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

function reducer(state: AuthState, action: any): AuthState {
  switch (action.type) {
    case ACTIONS.LOGIN:
      localStorage.setItem("authToken", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case ACTIONS.LOGOUT:
      localStorage.removeItem("authToken");
      return {
        isAuthenticated: false,
        token: null,
        user: null,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    isAuthenticated: false,
    token: null,
    user: null,
  });
  const navigate = useNavigate();
  const location = useLocation();

  const actions = {
    login: async (token: string) => {
      dispatch({ type: ACTIONS.LOGIN, payload: { token, user: null } });

      try {
        const response = await fetch(
          "https://sandbox.academiadevelopers.com/users/profiles/profile_data/",
          {
            method: "GET",
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        if (response.ok) {
          const userData = await response.json();
          dispatch({ type: ACTIONS.LOGIN, payload: { token, user: userData } });
        } else {
          dispatch({ type: ACTIONS.LOGOUT });
        }
      } catch (error) {
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
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context[type];
}
