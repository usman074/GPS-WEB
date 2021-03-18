import styled from 'styled-components';

export const AppContainer = styled.div`
    display: grid;
    grid-template-columns: 256px 1fr;
    grid-template-rows: auto 1fr;

    grid-template-areas: "sidemenu header" "sidemenu content";
`;

export const HeaderWrapper = styled.div`
    grid-area: header;
`;

export const SidemenuWrapper = styled.div`
    grid-area: sidemenu;
`;

export const ContentWrapper = styled.div`
    grid-area: content;
`;