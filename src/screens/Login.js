import routes from "../routes";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import login_logo from "../images/logos/login_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import Button from "../components/auth/Button";
import BottomBox from "../components/auth/BottomBox";
import Separator from "../components/auth/Separator";


const ImageBox = styled.div`
    text-align: center;
    justify-content: center;
    align-items: center;
`;

const FacebookLogin = styled.div`
    color: #385285;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`;

function Login() {
    return (
        <AuthLayout>
                <FormBox>
                    <ImageBox>
                        <div>
                            <img src={login_logo} width="60%" height="60%" alt="login_logo" />
                        </div>
                    </ImageBox>
                    <form>
                        <Input type="text" placeholder="USERNAME" />
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