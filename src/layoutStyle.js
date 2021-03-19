import styled from 'styled-components';

export const AppContainer = styled.div`
    display: grid;
    grid-template-columns: ${props=> props.isLogin? '256px 1fr': '1fr'};
    grid-template-rows: auto 1fr;

    grid-template-areas: ${props=> props.isLogin? '"sidemenu header" "sidemenu content"': 'none'};
`;

export const HeaderWrapper = styled.div`
    grid-area: header;
`;

export const SidemenuWrapper = styled.div`
    grid-area: sidemenu;
`;

export const ContentWrapper = styled.div`
    grid-area: content;
    height: 100vh;
    background: white;
`;