import routes from "../routes";
import styled from "styled-components";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import PageTitle from "../components/PageTitle";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import AuthLayout from "../components/auth/AuthLayout";
import login_logo from "../images/logos/login_logo.png";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { FatLink } from "../components/shared";
import { gql, useMutation } from "@apollo/client";
import { ImageBox } from "../components/auth/ImageBox";

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Subtitle = styled(FatLink)`
    font-size: 13px;
    margin-top: 10px;
    margin-bottom: 0px;
    text-align: center;
`;

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $username: String!
        $email: String!
        $password: String!
    ) {
        createAccount(
            username:$username
            email:$email
            password:$password
        ) {
            ok
            error
        }
    }
`;

function SignUp() {
    const history = useHistory();
    // onCompleted는 우리에게 data를 보내주는데, 이 data는 바로 useMutation에서 오는 data이다.
    const onCompleted = (data) => {
        const { email } = getValues();
        const { createAccount: {ok, error } } = data;
        if (!ok) { return; }
        // history API에 접근해서 홈화면으로 돌려주는 작업
        history.push(routes.home, {message: "계정이 생성되었습니다. 로그인해주세요.", email});
    }
    // LOGIN_MUTATION에 있는 error가 폼에 나오도록 하기 위한 hooks 사전작업
    // loading은 mutation이 잘 전송되었는지 확인하고, data는 mutation 종료 이후에 data가 있는지 확인하고, called는 mutation이 호출된건지 여부를 확인할 수 있다.
    // onCompleted는 mutation이 발생하는지 끝났는지 확인해주는 작업이다.
    const [ createAccount, { loading } ] = useMutation(CREATE_ACCOUNT_MUTATION, {
        onCompleted
    });
    const { register, formState, handleSubmit, errors, getValues } = useForm({ mode: "onChange" });
    
    // onSubmitValid는 form에 있는 input을 검사해줌
    const onSubmitValid = (data) => {
        // console.log(data, "이것은 onSubmitValid의 console.log입니다.")
        if (loading) { return; }
        createAccount({ variables: { ...data } })
    }

    return (
        <AuthLayout>
            {/* 화면 상단 탭에 보이는 디자인 */}
            <PageTitle title="Sign Up" />
            <FormBox>
                <HeaderContainer>
                    <ImageBox>
                        <div>
                            <img src={login_logo} width="60%" height="60%" alt="login_logo" />
                        </div>
                    </ImageBox>
                    <Subtitle>
                        친구들의 사진과 동영상을 보려면 가입하세요.
                    </Subtitle>
                </HeaderContainer>
                <form onSubmit={handleSubmit( onSubmitValid )}>
                    <Input ref={ register({ required: "USERNAME은 필수항목입니다." }) } name="username" type="text" placeholder="USERNAME" />
                    <Input ref={ register({ required: "EMAIL은 필수항목입니다." }) } name="email" type="text" placeholder="EMAIL" />
                    <Input ref={ register({ required: "PASSWORD는 필수항목입니다." }) } name="password" type="password" placeholder="PASSWORD" />
                    <Button type="submit" value={loading ? "Loading..." : "Sign Up"} disabled={!formState.isValid || loading} />
                </form>
                <Subtitle>
                    <div>가입하면 Beautiful Moment의 약관, </div>
                    <div>데이터 정책 및 쿠키 정책에 동의하게 됩니다.</div>
                </Subtitle>
            </FormBox>
            <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
        </AuthLayout>
    );
}

export default SignUp;