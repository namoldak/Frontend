import React, { useEffect } from "react";

//외부모듈
import styled from "styled-components";

function Theme() {

    return(
        <StTheme>Theme
            <button>방나가기</button>
            <h2>주제 : 사람이름 </h2>
        </StTheme>
    )
}

export default Theme;

const StTheme = styled.div`
    border:  1px solid blue;
   
`