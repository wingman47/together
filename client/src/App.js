import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "scenes/homePage/HomePage";
import "./App.css";
import LoginPage from "scenes/loginPage/LoginPage";
import ProfilePage from "scenes/profilePage/ProfilePage";

// to memorize the result of a computation and prevent unnecessary
// recalculations during component rendering by caching the result of function
import { useMemo } from "react";

// to subscribe a specific part of the Redux state and automatically re-render component whenever that part of the state changes.
import { useSelector } from "react-redux";

import RegisterPage from "scenes/registerPage/RegisterPage";

function App() {
  // subscribe to mode from initial state from state/index.js
  const isAuth = Boolean(useSelector((state) => state.token));

  // themeSettings(mode) returns theme for the mode passed
  // [mode] is the dependency for useMemo. If it is changed then only this
  // function is called.
  // const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        {/* <ThemeProvider theme={theme}> */}
        {/* <CssBaseline /> */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* user can still set random value and access these pages but
            the actual content will still be protected in the backend */}
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile/:userId"
            element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
          />
        </Routes>
        {/* </ThemeProvider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
