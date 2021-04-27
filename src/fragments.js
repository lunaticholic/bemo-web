import { gql } from "@apollo/client";

// fragment는 다른 query에서 사용 가능한 graphql 코드 조각이다
// 가장 많이 중복되는 항목들만 만들면 된다.
export const PHOTO_FRAGMENT = gql`
    fragment PhotoFragment on Photo {
        id
        file
        likes
        commentNumber
        isLiked
    }
`;

// fragment는 다른 query에서 사용 가능한 graphql 코드 조각이다
export const COMMENT_FRAGMENT = gql`
    fragment CommentFragment on Comment {
        id
        user {
        username
        avatar
        }
        payload
        isMine
        createdAt
    }
`;