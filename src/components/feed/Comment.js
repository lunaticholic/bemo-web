import PropTypes from "prop-types";
import styled from "styled-components";
import sanitizeHtml from "sanitize-html";
import { FatText } from "../shared";

const CommentContainer = styled.div`
`;
const CommentCaption = styled.span`
    margin-left: 20px;
    mark {
        background-color: inherit;
        color: ${(props) => props.theme.accent};
        cursor: pointer;
        text-decoration: underline;
    }
`;

function Comment({ author, payload }) {
    // 밑의 dangerouslySetInnerHTML의 위험성을 줄이기위해 아래와 같이 sanitizeHtml 메소드를 사용하여 보호해준다.
    // user를 너무 밑지 마 ㅋㅋ
    const cleanPayload = sanitizeHtml(
            payload.replace(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g, "<mark>$&</mark>"), 
            {
                allowedTags: ["mark"]
            }
        )
    return (
        <CommentContainer>
            <FatText>{author}</FatText>
            {/* 이 props는 텍스트가 아니라 html로 해석될 수 있도록 만들어주지롱 */}
            {/* 하지만 이건 너무 위험하지롱, 모든 걸 HTML로 만들어버려서  */}
            <CommentCaption dangerouslySetInnerHTML={
                { __html: cleanPayload }
            } />
        </CommentContainer>
    )
}

Comment.propTypes = {
    author: PropTypes.string.isRequired,
    payload: PropTypes.string.isRequired
}

export default Comment;