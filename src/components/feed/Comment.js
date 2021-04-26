import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../shared";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($id: Int!) {
        deleteComment(id: $id) {
            ok
        }
    }
`;

const CommentContainer = styled.div`
    margin-bottom: 5px;
`;
const CommentCaption = styled.span`
    margin-left: 20px;
    a {
        background-color: inherit;
        color: ${(props) => props.theme.accent};
        cursor: pointer;
        text-decoration: underline;
    }
`;

function Comment({ id, photoId, isMine, author, payload }) {
    // comment를 삭제하면 실시간으로 화면에 반영하기
    const updateDeleteComment = (cache, result) => {
        const {
            data: {
                deleteComment: { ok },
            },
        } = result;
        if (ok) {
            // comment를 삭제하고 (cache에서), 실제로도 삭제 되겠지
            cache.evict({ id: `Comment:${id}` });
            // 조그만한 글씨의 comments가 삭제될때마다 하나씩 줄어들겠지
            cache.modify({
                id: `Photo:${photoId}`,
                fields: {
                    commentNumber(prev) {
                        return prev - 1;
                    },
                },
            });
        }
    }
    // comment를 삭제하기 위한 작업, comment를 삭제할 때 그 comment의 id값을 찾아서 삭제한다.
    const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
        variables: {
            id,
        },
        update: updateDeleteComment,
    });
    const onDeleteClick = () => {
        deleteCommentMutation();
    };
    return (
        <CommentContainer>
            {/* 이 링크는 사용자의 username을 클릭했을때 Profile 페이지로 넘어가기 위해서 */}
            <Link to={`/users/${author}`}>
                <FatText>{author}</FatText>
            </Link>
            <CommentCaption>
                {/* 정규 표현식을 사용하여서 hashtag로 되어있는 단어들을 링크로 연결하여 관련 hashtag를 가진 사진들을 보여줄거임 */}
                {/* 이렇게 하면 map이 등록되어 있는 글을 배열로 만들건데 이렇게만 하면 'kep' prop을 만들라고 발생함 */}
                {payload.split(" ").map((word, index) => 
                    /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) ? (
                        <React.Fragment key={index}>
                            <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
                        </React.Fragment>
                    )  : (
                        <React.Fragment key={index}>
                            {word}{" "}
                        </React.Fragment>
                    )
                )}
            </CommentCaption>
            { isMine ? <button onClick={onDeleteClick}>❌</button> : null }
        </CommentContainer>
    )
}

Comment.propTypes = {
    isMine: PropTypes.bool,
    id: PropTypes.number,
    photoId: PropTypes.number,
    author: PropTypes.string.isRequired,
    payload: PropTypes.string.isRequired
}

export default Comment;