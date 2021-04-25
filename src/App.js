import routes from "./routes";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Layout from "./components/Layout";
import NotFound from "./screens/NotFound";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    // ApolloProvider 컴포넌트를 사용하여 Apollo Client를 react에 연결해준다.
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                {/* 로그인이 되어 있는 상태라면 header와 함께 홈화면이 보일 것이고, 아니면 로그인 화면만 보일 것이다. */}
                { isLoggedIn ? ( <Layout><Home /></Layout> ) : ( <Login /> ) }
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
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;

// Route 옆에 path로 어떠한 경로를 설정해주면 그 안에 있는 무언가를 보여줄 거임