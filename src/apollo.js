import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "token";

// Boolean값을 통해 로그인이 되었다면 브라우저는 이를 기억하도록 하는 장치임
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const logUserIn = (token) => {
    // 발급받은 토큰을 저장하는 방법
    localStorage.setItem(TOKEN, token)
    isLoggedInVar(true);
}
export const logUserOut = (token) => {
    // 발급받은 토큰을 삭제하는 방법
    localStorage.removeItem(TOKEN, token)
    isLoggedInVar(false);
}

export const darkModeVar = makeVar(false);

export const client = new ApolloClient({
    uri:"http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

/*
    uri: client가 로그인하기 위해 정보를 제공받을 수 있는 서버의 주소
    cache: Apollo가 한번 가져온 정보를 기억하게 해서 매번 같은 정보를 가져오지 않도록 하는 녀석
            Apollo는 local환경에 정보를 저장해 놓는데, 이는 우리가 홈페이지를 수정할 떄마다 매번 정보를 불러오는 걸 막아주는 쩌는 녀석
*/