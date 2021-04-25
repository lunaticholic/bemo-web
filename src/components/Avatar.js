import styled from "styled-components";

const SAvatar = styled.div`
    width: 44px;
    height: 44px;
    border-radius: 30px;
    background-color: #2C2C2C;
    overflow: hidden;
`;

const Img = styled.img`
    max-width: 100%;
`;

function Avatar({ url = "" }) {
    return (
        <SAvatar>
            { url !== "" ? <Img src={url} /> : null}
        </SAvatar>
    )
}

export default Avatar;