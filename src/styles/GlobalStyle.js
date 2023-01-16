import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const Globalstyle = createGlobalStyle`
${reset}

* {
    box-sizing: border-box;
}
body {
    font-family: 'CoreDream';
}
ol, ul {
    list-style: none;
}
a {
    color: inherit;
    text-decoration: inherit;
}
img {
    width: 100%;
    height: 100%;
    display: block;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    /* user-drag: none; */
}
button {
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
}
`;

export default Globalstyle;
