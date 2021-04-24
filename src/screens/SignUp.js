import routes from "../routes";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import login_logo from "../images/logos/login_logo.png";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import Button from "../components/auth/Button";
import BottomBox from "../components/auth/BottomBox";
import { FatLink } from "../components/shared";
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
function SignUp() {
    return (
        <AuthLayout>
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
                    <form>
                        <Input type="text" placeholder="EMAIL" />
                        <Input type="text" placeholder="USERNAME" />
                        <Input type="password" placeholder="PASSWORD" />
                        <Button type="submit" value="SIGN UP" />
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