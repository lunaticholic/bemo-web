import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";

const ME_QUERY = gql`
    query me {
        me {
            id
            username
            avatar
        }
    }
`;

function useUser() {
    // 사용자가 로그인했는지 확인하는 작업
    // 이건 실제 로그인을 의미하는 것이 아니고, localStorage에서 로그인했음을 의미함
    // 더 쉽게 말하면 눈속임용 로그인
    const hasToken = useReactiveVar(isLoggedInVar);
    const { data } = useQuery(ME_QUERY, {
        // 무슨 말이냐, 사용자가 localStorage를 통해 로그인하지 않는 경우 이 쿼리를 실행하지 않을거임
        skip: !hasToken
    });
    // console.log(data)
    // hook이 마운트되면 한번 실행되고, 이 후 변경될 때마다 실행된다
    useEffect(() => {
        if(data?.me === null) {
            logUserOut()
            // console.log("localStorage에 token이 존재하지만, token이 BackEnd에서 작동하지 않고 있어요.")
        }
    }, [data])
    return { data };
}

export default useUser;