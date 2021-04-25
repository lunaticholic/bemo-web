import { logUserOut } from "../apollo";
import { useHistory } from "react-router-dom";

// 홈화면에 아이디 값이 나타날 때 history로 apollo.js와 연결하면 없애줄수 있다.
function Home() {
    const history = useHistory();
    return (
        <div>
            <h1>HOME</h1>
            <button onClick={() => logUserOut(history)}>Log Out Now!</button>
        </div>
    );
}
export default Home;