import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "TOKEN";
const DARK_MODE = "DARK_MODE"

// Boolean값을 통해 로그인이 되었다면 브라우저는 이를 기억하도록 하는 장치임
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const logUserIn = (token) => {
    // 발급받은 토큰을 저장하는 방법
    localStorage.setItem(TOKEN, token)
    isLoggedInVar(true);
}
export const logUserOut = (history) => {
    // 발급받은 토큰을 삭제하는 방법
    localStorage.removeItem(TOKEN)

    // 아래 2개의 구문은 회원가입시 진행했던 email을 home화면으로 넘겨주는 구문을 모두 없애준다. 심지어 메세지도
    history.replace();
    window.location.reload();
    //isLoggedInVar(false);
}

// 배경 색상 및 폰트 색상 등 각종 색상등을 darkMode와 어울리게 변경
// 방법은 token과 비슷하네
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));
export const enableDarkMode = () => {
    localStorage.setItem(DARK_MODE, "enabled");
    darkModeVar(true);
}
export const disableDarkMode = () => {
    localStorage.removeItem(DARK_MODE);
    darkModeVar(false);
}

export const client = new ApolloClient({
    uri:"http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

/*
    uri: client가 로그인하기 위해 정보를 제공받을 수 있는 서버의 주소
    cache: Apollo가 한번 가져온 정보를 기억하게 해서 매번 같은 정보를 가져오지 않도록 하는 녀석
            Apollo는 local환경에 정보를 저장해 놓는데, 이는 우리가 홈페이지를 수정할 떄마다 매번 정보를 불러오는 걸 막아주는 쩌는 녀석
*/