import { logUserOut } from "../apollo";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";

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

// 홈화면에 아이디 값이 나타날 때 history로 apollo.js와 연결하면 없애줄수 있다.
function Home() {
    const { data } = useQuery(FEED_QUERY);
    const history = useHistory();
    return (
        <div align="center">
            {/* Photo페이지에서 페이지를 불러오며, 이 때 데이터는 ...photo로 표시해주는데 Photo페이지에 propTypes로 지정하여 불러왔다. */}
            {data?.seeFeed?.map((photo) => <Photo key={photo.id} {...photo} /> )}
            {/* <button onClick={() => logUserOut(history)}>Log Out Now!</button> */}
        </div>
    );
}
export default Home;