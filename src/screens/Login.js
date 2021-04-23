import { Link } from "react-router-dom";
import styled from "styled-components";
import login_logo from "../images/logos/login_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";

const Container = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ImageBox = styled.div`
    text-align: center;
    justify-content: center;
    align-items: center;
`;

const WhiteBox = styled.div`
    background-color: white;
    border: 1px solid ${props => props.theme.borderColor};
    width: 100%;
`;

const TopBox = styled(WhiteBox)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 35px 40px 25px 40px;
    margin-bottom: 10px;
    form {
        margin-top: 35px;
        width: 100%;
        display: flex;
        justify-items: center;
        flex-direction: column;
        align-items: center;
    }
`;

const Input = styled.input`
    width: 100%;
    border-radius: 3px;
    padding: 7px;
    background-color: #fafafa;
    border: 0.5px solid rgb(219, 219, 219);
    margin-top: 5px;
    box-sizing: border-box;
    &::placeholder {
        font-size: 12px;
    }
`;

const Button = styled.input`
    border: none;
    margin-top: 12px;
    background-color: ${props => props.theme.accent};
    color: white;
    text-align: center;
    padding: 8px 0px;
    font-weight: 600;
    width: 100%;
`;

const BottomBox = styled(WhiteBox)`
    padding: 20px 0px;
    text-align: center;
    a {
        font-weight: 600;
        margin-left: 10px;
        color: ${props => props.theme.accent};
    }
`;

const Wrapper = styled.div`
    max-width: 350px;
    width: 100%;
`;

const Separator = styled.div`
    margin: 20px 0px 30px 0px;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    div {
        width: 100%;
        height: 1px;
        background-color: rgb(219, 219, 219);
    }
    span {
        margin: 0px 10px;
        font-weight: 600;
        font-size: 12px;
        color: #8e8e8e;
    }
`;

const FacebookLogin = styled.div`
    color: #385285;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`;

function Login({ setIsLoggedIn }) {
    return (
        <Container>
            <Wrapper>
                <TopBox>
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
                <Separator>
                    <div></div>
                    <span>Or</span>
                    <div></div>
                </Separator>
                <FacebookLogin>
                    <FontAwesomeIcon icon={faFacebookSquare} />
                    <span>LOG IN WITH FACEBOOK</span>
                </FacebookLogin>
                </TopBox>
                <BottomBox>
                    <span>Don't Have an Account?</span>
                    <Link to="/signup">Sign Up</Link>
                </BottomBox>
            </Wrapper>
        </Container>
    );
}

export default Login;