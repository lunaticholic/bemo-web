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
import { gql, useMutation } from "@apollo/client";
import { ImageBox } from "../components/auth/ImageBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { logUserIn } from "../apollo";

const FacebookLogin = styled.div`
    color: #385285;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`;

const LOGIN_MUTATION = gql`
    mutation login($email: String!, $password: String!) {
        login(email:$email, password:$password) {
            ok
            token
            error
        }
    }
`;

function Login() {
    // input을 위해 state를 만들어줘야 하고, onChange도 만들고, value도 설정해야 하는데
    // register를 사용하면 모든 게 해결됨
    // watch를 사용하게 되면 현재 form에 기록되는 모든 글자를 바라볼 수 있음
    // handleSubmit은 폼에서 어떠한 양식이 작성되고 전달되면 그 전달되는 역할을 수행해준다.
    // errors는 폼 안에서 일어나는 에러를 감지하고 메세지가 있다면 출력해준다.
    // formState는 폼에서 일어날 수 있는 것들에 대해 반응한다
    // onBlur는 어떠한 항목을 벗어났을때만 입력된 값이 유효한지 확인한다는 의미
    // onChange는 어떠한 항목이 변경될 때마다 입력된 값이 유효한지 확인한다는 의미
    const { register, handleSubmit, errors, formState, getValues, setError, clearErrors } = useForm({
        mode: "onChange"
    })
    
    // onCompleted에 data를 집어넣게 되면 밑에 정의한 폼이 작업을 끝나면 data안에 정보를 반환해준다.
    // 어떤 정보냐면 위의 정의해놓은 mutation의 ok, token, error가 나올 것이다.
    const onCompleted = (data) => {
        // console.log(data, "이것은 onCompleted의 console.log입니다.");
        const {login: {ok, token, error}} = data;
        // 위의 구문에서 로그인에 성공하면 ok를 반환하는데, 만약 실패할경우 에러메세지를 반환하라는 if문이다.
        if(!ok) {
            return setError("result", {
                // 이런식으로 표기를 해줘야 BackEnd에서 많은 양의 error를 보내는 대신에 어떤식으로 error를 보이게 할지 컨트롤 할 수 있다.
                message: error,
            })
        }
        // 토큰을 저장하는 가장 간단한 방법, 그래야 로그인이 되고 홈화면으로 넘어가니까 
        if (token) {
            logUserIn(token)
        }
    }

    // LOGIN_MUTATION에 있는 error가 폼에 나오도록 하기 위한 hooks 사전작업
    // loading은 mutation이 잘 전송되었는지 확인하고, data는 mutation 종료 이후에 data가 있는지 확인하고, called는 mutation이 호출된건지 여부를 확인할 수 있다.
    // onCompleted는 49번째줄에 명시해놨지만 mutation이 발생하는지 끝났는지 확인해주는 작업이다.
    const [ login, { loading } ] = useMutation(LOGIN_MUTATION, { onCompleted });

    // onSubmitValid는 form에 있는 input을 검사해줌
    const onSubmitValid = (data) => {
        // console.log(data, "이것은 onSubmitValid의 console.log입니다.")
        if (loading) {
            return;
        }
        const { email, password } = getValues();
        // 51번째 줄의 login을 호출해야됨
        login({
            variables: {
                email, password
            }
        })
    }

    const clearLoginError = () => { clearErrors("result") };
    
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
                <form onSubmit={handleSubmit( onSubmitValid )}>
                    {/* register안에 required는 필수항목, minLength는 최소로 입력되어야 할 문자의 수 */}
                    {/* ref안에는 validate를 사용하여 필수로 추가되어야 하는 것도 검사 가능하고, pattern을 통해 입력 형식을 검사할 수 있다. 개쩌네 */}
                    {/* onChange안에는 error가 발생하고 난 후 다시 뭔가 변경을 시도하면 에러를 없애주는 구문이다. */}
                    <Input ref={register({ required: "email은 필수항목입니다.", minLength: 5 })} onChange={clearLoginError} name="email" type="text"placeholder="EMAIL" hasError={Boolean(errors?.email?.message)} />
                    
                    {/* email 채워져 있지 않은 경우 아래 항목을 통해 email required가 메세지로 보일 것이다. */}
                    <FormError message={errors?.email?.message} />
                    
                    <Input ref={register({ required: "password는 필수항목입니다.", minLength: { value: 5, message: "password는 최소 5글자 이상입니다."} })} onChange={clearLoginError} name="password" type="password" placeholder="PASSWORD" hasError={Boolean(errors?.password?.message)} />
                    {/* password항목이 채워져 있지 않은 경우 아래 항목을 통해 password required가 메세지로 보일 것이다. */}
                    <FormError message={errors?.password?.message} />
                    
                    {/* disabled를 통해 이 form이 다 채워지기 전에는 활성화가 안되도록 설정한다. */}
                    <Button type="submit" value={loading ? "Loading..." : "Log In"} disabled={!formState.isValid || loading} />
                    <FormError message={errors?.result?.message} />
                </form>
            <Separator />
            {/* oAuth 중 하나인 페이스북을 통한 로그인을 진행하는 구문 */}
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