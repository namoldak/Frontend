import React, { useEffect } from "react";

//외부모듈
import styled from "styled-components";

function InfoText() {

    return(
        <StInfoText>InfoText
            <div>
                <p> ex) 게임이 시작되었습니다</p>
            </div>
        </StInfoText>
    )
}

export default InfoText;

const StInfoText = styled.div`
    border: 1px solid green;
    `