import styled from "styled-components";
import home_logo from "../images/logos/home_logo(blue).png";
import { isLoggedInVar } from "../apollo";
import { ImageBox } from "./auth/ImageBox";
import { useReactiveVar } from "@apollo/client";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import routes from "../routes";
import useUser from "../hooks/useUser";
import Avatar from "./Avatar";

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

const Button = styled.span`
    background-color: ${(props) => props.theme.accent};
    border-radius: 4px;
    padding: 4px 15px;
    color: white;
    font-weight: 600;
`;

const IconsContainer = styled.div`
    display: flex;
    align-items: center;
`;

function Header() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const { data } = useUser();
    return (
        <SHeader>
            <Wrapper>
                <ImageBox>
                    <div>
                        <img src={home_logo} width="60%" height="60%" alt="login_logo" />
                    </div>
                </ImageBox>
                <Column>
                {/* 마찬가지로 로그인이 되어 있다면 이 화면이 보일 것이고 아래의 아이콘 대신에 로그인버튼이 보일 것이다. */}
                {isLoggedIn ? (
                    <IconsContainer>
                    <Icon> <FontAwesomeIcon icon={faHome} size="3x" /> </Icon>
                    <Icon> <FontAwesomeIcon icon={faCompass} size="3x" /> </Icon>
                    <Icon><Avatar url={data?.me?.avatar} /></Icon>
                    </IconsContainer>
                ) : (
                    <Link href={routes.home}>
                        <Button>Log In</Button>
                    </Link>
                )}
                </Column>
            </Wrapper>
        </SHeader>
    );
}
export default Header;