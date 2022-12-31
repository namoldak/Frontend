import React, { useEffect } from "react";
//내부모듈
import Card from "./Card";
//외부모듈
import styled from "styled-components";

function UserCards() {

    return(
        <>
        UserCards
        <StUserCards>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </StUserCards>
        </>
    )
}

export default UserCards;

const StUserCards = styled.div`
    border:  1px solid blue;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
   
`