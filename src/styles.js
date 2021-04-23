import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
    fontColor: "#2c2c2c",
    bgColor: "rgb(249, 249, 249)",
};

export const darkTheme = {
    fontColor: "rgb(249, 249, 249)",
    bgColor: "#2c2c2c",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
        all:unset;
    }
    * {
        box-sizing:border-box;
    }
    body {
        background-color: #FAFAFA;
        font-size: 14px;
        font-family: 'Noto Sans KR', sans-serif;
    }
    a {
        text-decoration: none;
    }
`;