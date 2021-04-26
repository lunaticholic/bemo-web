import { logUserOut } from "../apollo";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { FatText } from "../components/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faComment, faHeart, faPaperPlane } from "@fortawesome/free-regular-svg-icons";

//작성되어 있는 글들을 보여주려고 데이터를 가져오는 쿼리문
const FEED_QUERY = gql`
        query seeFeed {
            seeFeed {
                id
                user { 
                    username
                    avatar
                }
                file
                caption
                likes
                comments
                createdAt
                isMine
                isLiked
            }
        }
`;

const PhotoContainer = styled.div`
    background-color: white;
    border: 1px solid ${(props) => props.theme.borderColor};
    margin-bottom: 20px;
    max-width: 620px;
`;
const PhotoHeader = styled.div`
    display:flex;
    align-items: center;
    padding: 15px 20px;
`;

const Username = styled(FatText)`
    margin-left: 15px;
`;

const PhotoFile = styled.img`
    max-width: 100%;
`;
const PhotoData = styled.div`
    padding: 15px;
`;
const PhotoActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
        display: flex;
        align-items: center;
    }
    svg {
        font-size: 20px;
    }
`;
const PhotoAction = styled.div`
    margin-right: 10px;
`;

const Likes = styled(FatText)`
    margin-top: 10px;
    display: block;
    text-align: left;
`;

// 홈화면에 아이디 값이 나타날 때 history로 apollo.js와 연결하면 없애줄수 있다.
function Home() {
    const { data } = useQuery(FEED_QUERY);
    const history = useHistory();
    return (
        <div align="center">
            {data?.seeFeed?.map((photo) => (
                <PhotoContainer key={photo.id}>
                    <PhotoHeader>
                        <Avatar lg url={photo.user.avatar} />
                        <Username>{photo.user.username}</Username>
                    </PhotoHeader>
                    <PhotoFile src={photo.file} />
                    <PhotoData>
                        <PhotoActions>
                            <div>
                            <PhotoAction><FontAwesomeIcon style={{color: photo.isLiked ? "tomato" : "inherit"}} icon={photo.isLiked ? SolidHeart : faHeart} /></PhotoAction>
                            <PhotoAction><FontAwesomeIcon icon={faComment} /></PhotoAction>
                            <PhotoAction><FontAwesomeIcon icon={faPaperPlane} /></PhotoAction>
                            </div>
                            <div>
                                <FontAwesomeIcon size={"lg"} icon={faBookmark} />
                            </div>
                        </PhotoActions>
                        <Likes>{photo.likes === 1 ? "1 Like" : `${photo.likes} Likes`}</Likes>
                    </PhotoData>
                </PhotoContainer>
            ))}
            {/* <button onClick={() => logUserOut(history)}>Log Out Now!</button> */}
        </div>
    );
}
export default Home;