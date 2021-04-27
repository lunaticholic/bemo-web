import styled from "styled-components";
import Button from "../components/auth/Button";
import { PHOTO_FRAGMENT } from "../fragments";
import { useParams } from "react-router-dom";
import { FatText } from "../components/shared";
import { gql, useMutation, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import useUser from "../hooks/useUser";

const FOLLOW_USER_MUTATION = gql`
    mutation followUser($username: String!) {
        followUser(username: $username) {
        ok
        }
    }
`;

const UNFOLLOW_USER_MUTATION = gql`
    mutation unfollowUser($username: String!) {
        unfollowUser(username: $username) {
        ok
        }
    }
`;

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

const Header = styled.div`
    display: flex;
`;
const Avatar = styled.img`
    margin-left: 50px;
    height: 160px;
    width: 160px;
    border-radius: 50%;
    margin-right: 150px;
    background-color: #2c2c2c;
`;
const Column = styled.div``;
const Username = styled.h3`
    font-size: 28px;
    font-weight: 400;
`;
const Row = styled.div`
    margin-bottom: 20px;
    font-size: 16px;
    display: flex;
    align-items: center;
`;
const List = styled.ul`
    display: flex;
`;
const Item = styled.li`
    margin-right: 20px;
`;
const Value = styled(FatText)`
    font-size: 18px;
`;

const Grid = styled.div`
    display: grid;
    grid-auto-rows: 290px;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-top: 50px;
`;

const Photo = styled.div`
    background-image: url(${(props) => props.bg});
    background-size: cover;
    position: relative;
`;

const Icons = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    opacity: 0;
    &:hover {
        opacity: 1;
    }
`;

const Icon = styled.span`
    font-size: 18px;
    display: flex;
    align-items: center;
    margin: 0px 5px;
    svg {
        font-size: 14px;
        margin-right: 5px;
    }
`;

const ProfileBtn = styled(Button).attrs({
    as: "span",
})`
    margin-left: 10px;
    margin-top: 0px;
    cursor: pointer;
`;

function Profile() {
    const { username } = useParams();
    const { data: userData } = useUser();
    const { data } = useQuery(SEE_PROFILE_QUERY, {
        variables: {
        username,
        },
    });
    
    // 사용자의 팔로우와 언팔을 하게 해주는 기능임
    // refetchQueries는 실제로 버튼을 누르게 되면 상대방 profile의 숫자가 바뀐다.
    const [ unfollowUser ] = useMutation(UNFOLLOW_USER_MUTATION, { variables: { username } });
    const [ followUser ] = useMutation(FOLLOW_USER_MUTATION, { variables: { username } });

    const getButton = (seeProfile) => {
        const { isMe, isFollowing } = seeProfile;
        if (isMe) {
            // 사용자 본인의 profile을 볼 경우 edit profile
            return <ProfileBtn>Edit Profile</ProfileBtn>;
        }
        if (isFollowing) {
            // 다른 사용자의 profile을 보는데 follow중이라면
            return <ProfileBtn onClick={unfollowUser}>Unfollow</ProfileBtn>;
        } else {
            // 다른 사용자의 profile을 보는데 unfollow중이라면
            return <ProfileBtn onClick={followUser}>Follow</ProfileBtn>;
        }
    };

    return (
        <div>
            <Header>
                <Avatar src={data?.seeProfile?.avatar} />
                <Column>
                <Row>
                    <Username>{data?.seeProfile?.username}</Username>
                    {data?.seeProfile ? getButton(data.seeProfile) : null}
                </Row>
                <Row>
                    <List>
                    <Item>
                        <span>
                            <Value>{data?.seeProfile?.totalFollowers}</Value>&nbsp;&nbsp;followers
                        </span>
                    </Item>
                    <Item>
                        <span>
                            <Value>{data?.seeProfile?.totalFollowing}</Value>&nbsp;&nbsp;following
                        </span>
                    </Item>
                    </List>
                </Row>
                <Row>{data?.seeProfile?.bio}</Row>
                </Column>
            </Header>
            <Grid>
                {data?.seeProfile?.photos.map((photo) => (
                <Photo key={photo.id} bg={photo.file}>
                    <Icons>
                    <Icon>
                        <FontAwesomeIcon icon={faHeart} />
                        {photo.likes}
                    </Icon>
                    <Icon>
                        <FontAwesomeIcon icon={faComment} />
                        {photo.commentNumber}
                    </Icon>
                    </Icons>
                </Photo>
                ))}
            </Grid>
            </div>
    )
}

export default Profile;