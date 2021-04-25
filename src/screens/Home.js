import { logUserOut } from "../apollo";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { FatText } from "../components/shared";

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
            }
        }
`;

const PhotoContainer = styled.div`
    background-color: white;
    border: 1px solid ${(props) => props.theme.borderColor};
    margin-bottom: 20px;
`;
const PhotoHeader = styled.div`
    display:flex;
    align-items: center;
    padding: 5px 10px;
`;

const Username = styled(FatText)`
    margin-left: 10px;
`;

// 홈화면에 아이디 값이 나타날 때 history로 apollo.js와 연결하면 없애줄수 있다.
function Home() {
    const { data } = useQuery(FEED_QUERY);
    console.log(data)
    const history = useHistory();
    return (
        <div>
            {data?.seeFeed?.map((photo) => (
                <PhotoContainer key={photo.id}>
                    <PhotoHeader>
                        <Avatar url={photo.user.avatar} />
                        <Username>{photo.user.username}</Username>
                    </PhotoHeader>
                </PhotoContainer>)
            )}
            {/* <button onClick={() => logUserOut(history)}>Log Out Now!</button> */}
        </div>
    );
}
export default Home;