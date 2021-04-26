import PropTypes from "prop-types";
import styled from "styled-components";
import Comment from "./Comment";

const CommentsContainer = styled.div`
    margin-top: 20px;
    text-align: left;
`;
const CommentCount = styled.span`
    display: block;
    font-size: 10px;
    font-weight: 600;
    margin: 10px 0px;
    opacity: 0.7;
`;

function Comments({ author, caption, commentNumber, comments }) {
    return (
        <CommentsContainer>
            {/* 아래의 comment와 비슷한 구조이지만 이건 사진을 업로드한 작성자의 글을 보여주는 공간이다 */}
            <Comment author={author} payload={caption} />
            <CommentCount>
                {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
            </CommentCount>
            {comments?.map( comment => 
                // 위의 comment와 비슷한 구조이지만 이건 댓글을 작성한 작성자들의 글을 보여주는 공간이다.
                <Comment key={comment.id} author={comment.user.username} payload={comment.payload} />
            )}
        </CommentsContainer>
    )
}

Comments.propTypes = {
    author: PropTypes.string.isRequired,
    caption: PropTypes.string,
    commentNumber: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            user: PropTypes.shape({
                avatar: PropTypes.string,
                username: PropTypes.string.isRequired
            }),
            payload: PropTypes.string.isRequired,
            isMine: PropTypes.bool.isRequired,
            createdAt: PropTypes.string.isRequired,
        })
    )
}

export default Comments;