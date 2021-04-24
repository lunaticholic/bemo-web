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
import { ImageBox } from "../components/auth/ImageBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";

const FacebookLogin = styled.div`
    color: #385285;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`;

function Login() {
    // input을 위해 state를 만들어줘야 하고, onChange도 만들고, value도 설정해야 하는데
    // register를 사용하면 모든 게 해결됨
    // watch를 사용하게 되면 현재 form에 기록되는 모든 글자를 바라볼 수 있음
    const { register, handleSubmit } = useForm();

    // onSubmitValid는 form에 있는 input을 검사해줌
    const onSubmitValid = (data) => { console.log(data) }
    const onSubmitInValid = (data) => { console.log(data, "invalid") }
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
                {/* handleSumbit이 form을 검증할거임, 유효하면 onSubmitValid, 유효하지 않으면 onSubmitInValid */}
                <form onSubmit={handleSubmit(onSubmitValid, onSubmitInValid)}>
                    {/* register안에 required는 필수항목, minLength는 최소로 입력되어야 할 문자의 수 */}
                    {/* ref안에는 validate를 사용하여 필수로 추가되어야 하는 것도 검사 가능하고, pattern을 통해 입력 형식을 검사할 수 있다. 개쩌네 */}
                    <Input ref={register({ required: "username은 필수항목입니다.", minLength: 5 })} name="username" type="text"placeholder="USERNAME" />
                    <Input ref={register({ required: "password는 필수항목입니다.", minLength: 8 })} name="password" type="password" placeholder="PASSWORD" />
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