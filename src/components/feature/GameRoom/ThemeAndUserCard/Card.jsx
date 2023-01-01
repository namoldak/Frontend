import React, { useEffect } from "react";

//외부모듈
import styled from "styled-components";

function Card() {

    return(
        <StCard>Card
            <h4>키워드</h4>
            <span>OOO님</span>
            <div>이미지</div>
            <button>방장일 경우 시작버튼?</button>
        </StCard>
    )
}

export default Card;

const StCard = styled.div`
    border:  1px solid green;
   
`