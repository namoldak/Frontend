import React, { useEffect } from "react";

//내부모듈
import Time from "./Time";
import InfoText from "./InfoText";
//외부모듈
import styled from "styled-components";

function Timer() {

    return(
        <>
        <StTimer>
            Timer
            <Time/>
            <InfoText/>
        </StTimer>
        </>
    )
}

export default Timer;

const StTimer = styled.div`
    border: 2px solid red;
    display: grid;
    grid-template-rows: 1fr 1fr;
`