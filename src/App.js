import "./App.css";
import Login from "./pages/Login";
import Factorial from "./pages/Factorial";
import ToDo from "./pages/ToDo";
import EvenOdd from "./pages/EvenOdd";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Register from "./pages/Register";

const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return () => setValue((prevValue) => prevValue + 1);
};

function App() {
  const existingUsers = JSON.parse(localStorage.getItem("USER_DB"));
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const forceUpdate = useForceUpdate();
  if (!existingUsers || existingUsers.length === 0) {
    const initialUsers = [
      {
        email: "mario@gmail.com",
        password: "mario",
      },
      {
        email: "onigiri@gmail.com",
        password: "onigiri",
      },
      {
        email: "bunbun@gmail.com",
        password: "bunbun",
      },
    ];

    localStorage.setItem("USER_DB", JSON.stringify(initialUsers));
  }

  const [isValid, setValid] = useState(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(true);

  const validateUserHandler = (email, password) => {
    const users = JSON.parse(localStorage.getItem("USER_DB"));
    let isValided = false;

    users.forEach((user) => {
      if (user.email === email && user.password === password) {
        isValided = true;
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ email: user.email, password: user.password })
        );
        return;
      }
    });

    if (isValided) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const clearMsg = () => {
    setValid(null);
  };

  const [activeComponent, setActiveComponent] = useState("ToDo");

  const handleNavbarClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <>
      {!isValid && !isRegisterOpen && isLoginOpen && !currentUser && (
        <Login
          validateUserHandler={validateUserHandler}
          clearMsg={clearMsg}
          setIsRegisterOpen={setIsRegisterOpen}
          setIsLoginOpen={setIsLoginOpen}
        />
      )}
      {isRegisterOpen && !currentUser && (
        <Register
          validateUserHandler={validateUserHandler}
          clearMsg={clearMsg}
          setIsRegisterOpen={setIsRegisterOpen}
          setIsLoginOpen={setIsLoginOpen}
        />
      )}
      {isValid === false && (
        <p
          style={{
            width: "60vw",
            padding: "20px",
            fontSize: "1.3rem",
            background: "#FF2E2E",
            margin: "auto",
            color: "white",
            position: "absolute",
            top: "20px",
            left: "0",
            right: "0",
            zIndex: "1000",
          }}
        >
          Invalid email or password
        </p>
      )}
      <Navbar
        onNavbarClick={handleNavbarClick}
        activeComponent={activeComponent}
        forceUpdate={forceUpdate}
      />
      {activeComponent === "ToDo" && <ToDo forceUpdate={forceUpdate} />}
      {activeComponent === "Factorial" && <Factorial />}
      {activeComponent === "EvenOdd" && <EvenOdd />}
    </>
  );
}

export default App;
