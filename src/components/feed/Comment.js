import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FatText } from "../shared";

const CommentContainer = styled.div`
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

function Comment({ author, payload }) {
    return (
        <CommentContainer>
            <FatText>{author}</FatText>
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
        </CommentContainer>
    )
}

Comment.propTypes = {
    author: PropTypes.string.isRequired,
    payload: PropTypes.string.isRequired
}

export default Comment;