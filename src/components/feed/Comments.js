import Comment from "./Comment";
import PropTypes from "prop-types";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

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

const CREATE_COMMENT_MUTAION = gql`
    mutation createComment($photoId: Int!, $payload: String!) {
        createComment(photoId: $photoId, payload: $payload) {
            ok
            error
        }
    }
`;

function Comments({ photoId, author, caption, commentNumber, comments }) {
    const [ createCommentMutaion, { loading } ] = useMutation(CREATE_COMMENT_MUTAION);
    const { register, handleSubmit, setValue } = useForm();
    const onValid = (data) => {
        const { payload } = data;
        if (loading) {
            return ;
        }
        createCommentMutaion({ variables: { photoId, payload } })
        // mutation을 실행하고나서 name에 해당하는 값을 바꾼다
        // 이 말은 댓글을 작성하고 나서 엔터를 누르면 빈값으로 나타난다.
        setValue("payload", "");
    }
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
            <div>
                <form onSubmit={handleSubmit(onValid)}>
                    <input name="payload" ref={register({ require: true })} type="text" placeholder="이 곳에 댓글을 작성해주세요" />
                </form>
            </div>
        </CommentsContainer>
    )
}

Comments.propTypes = {
    photoId: PropTypes.number.isRequired,
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