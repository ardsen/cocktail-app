import { createContext, useContext, useReducer, useState } from "react";

const URL = "http://35.238.41.225:85";

const AuthContext = createContext();

const initialState = {
  user: null,
  username: "",
  password: "",
  isAuthenticated: false,
  token: "",
  isLoginScreenOpen: false,
  isSignUpScreenOpen: false,
  signUpUsername: "",
  signUpPassword: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "tokenReceived":
      return {
        ...state,
        token: action.payload,
        user: {
          username: state.username,
        },
        isAuthenticated: true,
      };
    case "username":
      return {
        ...state,
        username: action.payload,
      };
    case "password":
      return {
        ...state,
        password: action.payload,
      };
    case "loginScreenOpen":
      return {
        ...state,
        isLoginScreenOpen: true,
        isSignUpScreenOpen: false,
      };
    case "loginScreenClose":
      return {
        ...state,
        isLoginScreenOpen: false,
      };
    case "logout":
      return {
        ...state,
        isAuthenticated: false,
        isLoginScreenOpen: false,
      };

    case "signUpOpen":
      return {
        ...state,
        isLoginScreenOpen: false,
        isSignUpScreenOpen: true,
      };
    case "signUpClose":
      return {
        ...state,
        isSignUpScreenOpen: false,
      };
    case "signUpUsernameValue":
      return {
        ...state,
        signUpUsername: action.payload,
      };
    case "signUpPasswordValue":
      return {
        ...state,
        signUpPassword: action.payload,
      };

    default: {
      throw new Error("Unknown Action.");
    }
  }
}

function AuthProvider({ children }) {
  const [
    {
      token,
      username,
      password,
      isAuthenticated,
      user,
      isLoginScreenOpen,
      isSignUpScreenOpen,
      signUpUsername,
      signUpPassword,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [signedUp, setSignedUp] = useState(false);
  const login = async function (e) {
    e.preventDefault();
    try {
      const res = await fetch(`${URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (!res.ok)
        throw new Error(`Yanlış kullanıcı adı ya da şifre girdiniz.`);
      const data = await res.text();
      if (data === "Login Failed")
        throw new Error(`Yanlış kullanıcı adı ya da şifre girdiniz.`);
      dispatch({ type: "tokenReceived", payload: data });
    } catch (err) {
      console.log(err.message);
    }
  };

  const signUp = async function (e) {
    e.preventDefault();
    try {
      const res = await fetch(`${URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: signUpUsername,
          password: signUpPassword,
        }),
      });
      if (!res.ok) throw new Error("Something went wrong.");
      if (res.ok) {
        setSignedUp(true);
      }
      setTimeout(() => {
        setSignedUp(false);
        dispatch({ type: "loginScreenOpen" });
      }, 2000);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        dispatch,
        token,
        login,
        isAuthenticated,
        user,
        isLoginScreenOpen,
        isSignUpScreenOpen,
        signUpUsername,
        signUpPassword,
        signUp,
        signedUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Something wrong with the context");
  return context;
}

export { AuthProvider, useAuth };
