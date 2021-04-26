import Avatar from "../Avatar";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../shared";
import { gql, useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faComment, faHeart, faPaperPlane } from "@fortawesome/free-regular-svg-icons";

const TOGGLE_LIKE_MUTATION = gql`
    mutation toggleLike($id: Int!) {
        toggleLike(id: $id) {
            ok
            error
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
    cursor: pointer;
`;

const Likes = styled(FatText)`
    margin-top: 10px;
    display: block;
    text-align: left;
`;

function Photo({ id, user, file, isLiked, likes }) {
    // like버튼이 업데이트가 이루어지면 cache에 반환하여 실시간 업데이트를 이루어지게 하는 방법
    const updateToggleLike = (cache, result) => {
        const { data: { toggleLike: { ok }}} = result;
        // writeFragment? fragment를 write하는건 cache에서 우리가 원하는 특정 object의 일부분을 수정하는거야
        // 이렇게 작성하면 cache에 직접적으로 write할 수 있지요
        // 이렇게 하면? heart를 클릭했을 때 빨간색으로 나오고, 빨간색이면 반대로 나옴
        if (ok) {
            cache.writeFragment({
                id: `Photo:${id}`,
                // fragment는 데이터의 일부분, 작은 크기의 데이터임
                // BSName은 닉네임이니까 원하는 이름 적어주고 on 뒤에는 type을 적어줘야 된다. 여기서는 Photo를 수정할꺼니까 Photo가 타입이네
                fragment: gql` fragment BSName on Photo { isLiked } `,
                // data에는 우리가 cache에 어떤 걸 write할지 쓰면 된단다
                data: { isLiked: !isLiked }
            })
        }
    }
    // 좋아요버튼의 기능을 구현하기 위한 mutation
    // refetchQueries는 query를 다시 호출하는 기능, 그러니까 좋아요 버튼을 눌렀다면 눌렀다고 바로바로 알려줄 수 있는 기능
    const [ toggleLikeMutation ] = useMutation(TOGGLE_LIKE_MUTATION, { variables: { id }, update: updateToggleLike });

    return (
        <PhotoContainer key={id}>
            <PhotoHeader>
                <Avatar lg url={user.avatar} />
                <Username>{user.username}</Username>
            </PhotoHeader>
            <PhotoFile src={file} />
            <PhotoData>
                <PhotoActions>
                    <div>
                        {/* 좋아요 버튼을 눌러야되니 버튼처럼 보이게 해준다 */}
                        <PhotoAction onClick={toggleLikeMutation}><FontAwesomeIcon style={{color: isLiked ? "tomato" : "inherit"}} icon={isLiked ? SolidHeart : faHeart} /></PhotoAction>
                        <PhotoAction><FontAwesomeIcon icon={faComment} /></PhotoAction>
                        <PhotoAction><FontAwesomeIcon icon={faPaperPlane} /></PhotoAction>
                    </div>
                    <div>
                        <FontAwesomeIcon size={"lg"} icon={faBookmark} />
                    </div>
                </PhotoActions>
                <Likes>{likes === 1 ? "1 Like" : `${likes} Likes`}</Likes>
            </PhotoData>
        </PhotoContainer>
    )
}

Photo.propTypes = {
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
    }),
    file: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    likes: PropTypes.number.isRequired
}

export default Photo;