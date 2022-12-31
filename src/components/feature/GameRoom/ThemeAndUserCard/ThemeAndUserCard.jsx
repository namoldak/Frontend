import React, { useEffect } from "react";
//내부모듈
import Theme from "./Theme";
import UserCards from "./UserCards";
//외부모듈
import styled from "styled-components";

function ThemeAndUserCard() {

    return(
        <StThemeAndUserCard>ThemeAndUserCard
            <Theme/>
            <UserCards/>
        </StThemeAndUserCard>
    )
}

export default ThemeAndUserCard;

const StThemeAndUserCard = styled.div`
    border:  2px solid red;
    display: grid;
    grid-template-rows: 1fr 1fr;
`