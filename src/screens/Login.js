import routes from "../routes";
import styled from "styled-components";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import PageTitle from "../components/PageTitle";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import Separator from "../components/auth/Separator";
import AuthLayout from "../components/auth/AuthLayout";
import login_logo from "../images/logos/login_logo.png";
import { useState } from "react";
import { ImageBox } from "../components/auth/ImageBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";

const FacebookLogin = styled.div`
    color: #385285;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`;

function Login() {
    const [ username, setUsername ] = useState("");
    const [ usernameError, setUsernameError ] = useState("");
    const onUsernameChange = (event) => {
        // 실제로 console.log(event.target.value)를 한 다음 username에 타이핑을 하면 실시간으로 전송이된다.
        setUsernameError("");
        setUsername(event.target.value);
    }
    const handleSubmit = (event) => {
        // 바로 아래의 구문은 이벤트를 취소할 수 있는 경우, 이벤트의 전파를 막지 않고 그 이벤트를 취소하는 기능을 가진다.
        // 즉 여기서는 submit 버튼을 누르면 페이지가 새로고침을 하는데 이걸 취소한다는 것이다.
        event.preventDefault();
        if (username === "") {
            setUsernameError("username은 반드시 입력하셔야 합니다.")
        }
        if (username.length < 8) {
            setUsernameError("username은 8글자 이상입니다.")
        }
    }
    return (
        <AuthLayout>
            {/* 화면 상단 탭에 보이는 디자인 */}
            <PageTitle title="Log In" />
            <FormBox>
                <ImageBox>
                    <div>
                        <img src={login_logo} width="60%" height="60%" alt="login_logo" />
                    </div>
                </ImageBox>
                <form>
                    {usernameError}
                    <Input type="text"placeholder="USERNAME" />
                    <Input type="password" placeholder="PASSWORD" />
                    <Button type="submit" value="LOG IN" />
                </form>
            <Separator />
            <FacebookLogin>
                <FontAwesomeIcon icon={faFacebookSquare} />
                <span>LOG IN WITH FACEBOOK</span>
            </FacebookLogin>
            </FormBox>
            <BottomBox cta="Don't have an account?" linkText="Sign Up" link={routes.signUp} />
        </AuthLayout>
    );
}

export default Login;