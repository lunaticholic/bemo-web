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
import FormError from "../components/auth/FormError";

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
    // handleSubmit은 폼에서 어떠한 양식이 작성되고 전달되면 그 전달되는 역할을 수행해준다.
    // errors는 폼 안에서 일어나는 에러를 감지하고 메세지가 있다면 출력해준다.
    // formState는 폼에서 일어날 수 있는 것들에 대해 반응한다
    const { register, handleSubmit, errors, formState } = useForm({
        mode: "onChange"
    })
    // onBlur는 어떠한 항목을 벗어났을때만 입력된 값이 유효한지 확인한다는 의미
    // onChange는 어떠한 항목이 변경될 때마다 입력된 값이 유효한지 확인한다는 의미

    // onSubmitValid는 form에 있는 input을 검사해줌
    const onSubmitValid = (data) => {
        // console.log(data)
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
                {/* handleSumbit이 form을 검증할거임, 유효하면 onSubmitValid, 유효하지 않으면 onSubmitInValid */}
                <form onSubmit={handleSubmit( onSubmitValid )}>
                    {/* register안에 required는 필수항목, minLength는 최소로 입력되어야 할 문자의 수 */}
                    {/* ref안에는 validate를 사용하여 필수로 추가되어야 하는 것도 검사 가능하고, pattern을 통해 입력 형식을 검사할 수 있다. 개쩌네 */}
                    <Input ref={register({ required: "email은 필수항목입니다.", minLength: 5 })} name="email" type="text"placeholder="EMAIL" hasError={Boolean(errors?.email?.message)} />
                    {/* email 채워져 있지 않은 경우 아래 항목을 통해 email required가 메세지로 보일 것이다. */}
                    <FormError message={errors?.email?.message} />
                    <Input ref={register({ required: "password는 필수항목입니다.", minLength: { value: 5, message: "password는 최소 5글자 이상입니다."} })} name="password" type="password" placeholder="PASSWORD" hasError={Boolean(errors?.password?.message)} />
                    {/* password항목이 채워져 있지 않은 경우 아래 항목을 통해 password required가 메세지로 보일 것이다. */}
                    <FormError message={errors?.password?.message} />
                    {/* disabled를 통해 이 form이 다 채워지기 전에는 활성화가 안되도록 설정한다. */}
                    <Button type="submit" value="LOG IN" disabled={!formState.isValid} />
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