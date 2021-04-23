import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import NotFound from "./screens/NotFound";
import { darkModeVar, isLoggedInVar } from "./apollo";
import { useReactiveVar } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import routes from "./routes";


function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path={routes.home} exact>
            {isLoggedIn ? <Home /> : <Login />}
          </Route>
          <Route path={routes.signUp}>
            <SignUp />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;

// Route 옆에 path로 어떠한 경로를 설정해주면 그 안에 있는 무언가를 보여줄 거임