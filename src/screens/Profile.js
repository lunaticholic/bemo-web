import { useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";
import { PHOTO_FRAGMENT } from "../fragments";

const SEE_PROFILE_QUERY = gql`
    query seeProfile($username: String!) {
        seeProfile(username: $username) {
            username
            bio
            avatar
            photos {
                ...PhotoFragment
            }
            totalFollowing
            totalFollowers
            isMe
            isFollowing
        }
    }
    ${PHOTO_FRAGMENT}
`;

function Profile() {
    // 주소의 있는 username을 보고 어떻게 정보를 받아올 수 있을까? 답은 react HOOKS!!!!!!
    const { username } = useParams();
    const { data } = useQuery(SEE_PROFILE_QUERY, { variables: { username } })
    
    return "Profile"
}

export default Profile;