import Comment from "./Comment";
import PropTypes from "prop-types";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import useUser from "../../hooks/useUser";

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
            id
            ok
            error
        }
    }
`;

function Comments({ photoId, author, caption, commentNumber, comments }) {
    // user 정보를 가져오기 위한 Hooks
    const { data: userData } = useUser();
    const { register, handleSubmit, setValue, getValues } = useForm();
    // comment를 업데이트 하기 위해 매칭할 정보를 반환
    // 재밌게도 이건 위조품들임
    const createCommentUpdate = (cache, result) => {
        const { payload } = getValues();
        // mutation을 실행하고나서 name에 해당하는 값을 바꾼다
        // 이 말은 댓글을 작성하고 나서 엔터를 누르면 빈값으로 나타난다. 실제로는 작성이 완료된 상태라고 생각하면 빠름
        setValue("payload", "");
        const { data: { createComment: { ok, id } } } = result;
        if (ok && userData?.me) {
            const newComment = {
                __typename: "Comment",
                createdAt: Date.now() + "",
                id,
                isMine: true,
                payload,
                user: {
                    ...userData.me
                }
            }
            // console.log(newComment)

            // comment에 대한 cache를 수정하는 작업임
            cache.modify({
                // 우리가 수정하고 싶은 photo의 id
                id: `Photo:${photoId}`,
                // 우리가 수정하고 싶은 항목들
                fields: {
                    // 이전의 comments를 수정할거임
                    comments(prev) {
                        // 이전에 있단 comment와 새로운 comment를 붙여서 새 array를 만들고 return 할거임
                        return [...prev, newComment];
                    },
                    // comment가 작성되고 난 이후에 화면에 조그만한 글씨로 몇개의 comment가 있는지 알려주는 녀석
                    // 하나가 작성될 때마다 카운트가 1개씩 증가한다.
                    commentNumber(prev) {
                        return prev + 1;
                    },
                },
            });
        }
    }
    const [ createCommentMutaion, { loading } ] = useMutation(CREATE_COMMENT_MUTAION, {
        // comment를 새로 작성하고 등록할 수 있게 도와줄 녀석
        update: createCommentUpdate
    });
    const onValid = (data) => {
        const { payload } = data;
        if (loading) {
            return ;
        }
        createCommentMutaion({ variables: { photoId, payload } })
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