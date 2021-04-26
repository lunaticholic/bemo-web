import { useParams } from "react-router";

function Profile() {
    // 주소의 있는 username을 보고 어떻게 정보를 받아올 수 있을까? 답은 react HOOKS!!!!!!
    const params = useParams();
    console.log(params);
    return "Profile"
}

export default Profile;