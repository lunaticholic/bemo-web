import styled from "styled-components";

const SButton = styled.input`
border: none;
margin-top: 12px;
background-color: ${props => props.theme.accent};
color: white;
text-align: center;
padding: 8px 0px;
font-weight: 600;
width: 100%;
`;

// 괄호 안에 props라고 적어주고 props를 반환하게 해주면 실제 페이지에서 value값에 뭘 적든 반환이 된다.
function Button(props) {
    return (
        <SButton {...props} />
    )
}

export default Button;