import styled from "styled-components";
import home_logo from "../images/logos/home_logo(blue).png";
import { isLoggedInVar } from "../apollo";
import { ImageBox } from "./auth/ImageBox";
import { useReactiveVar } from "@apollo/client";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass, faUser } from "@fortawesome/free-regular-svg-icons";

const SHeader = styled.header`
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    background-color: ${(props) => props.theme.bgColor};
    padding: 18px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    max-width: 900px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
    margin-left: 15px;
`;

function Header() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    return (
        <SHeader>
            <Wrapper>
                <ImageBox>
                    <div>
                        <img src={home_logo} width="60%" height="60%" alt="login_logo" />
                    </div>
                </ImageBox>
                <Column>
                {/* 마찬가지로 로그인이 되어 있다면 이 화면이 보일 것이고 아니면 안보일 것이다. */}
                {isLoggedIn ? (
                    <>
                    <Icon> <FontAwesomeIcon icon={faHome} size="lg" /> </Icon>
                    <Icon> <FontAwesomeIcon icon={faCompass} size="lg" /> </Icon>
                    <Icon> <FontAwesomeIcon icon={faUser} size="lg" /> </Icon>
                    </>
                ) : null}
                </Column>
            </Wrapper>
        </SHeader>
    );
}
export default Header;