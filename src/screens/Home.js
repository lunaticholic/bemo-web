import { logUserOut } from "../apollo";

function Home() {
    return (
        <div>
            <h1>HOME</h1>
            <button onClick={() => logUserOut()}>Log Out Now!</button>
        </div>
    );
}
export default Home;