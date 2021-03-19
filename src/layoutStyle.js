import styled from 'styled-components';

export const AppContainer = styled.div`
    display: grid;
    grid-template-columns: ${props=> props.isLogin? '256px 1fr': '1fr'};
    grid-template-rows: auto 1fr;

    grid-template-areas: ${props=> props.isLogin? '"sidemenu header" "sidemenu content"': 'none'};
`;

export const HeaderWrapper = styled.div`
    grid-area: header;
    position: fixed;
    right: 0px;
    width: calc(100% - 256px);
    z-index: 1;
`;

export const SidemenuWrapper = styled.div`
    grid-area: sidemenu;
`;

export const ContentWrapper = styled.div`
    grid-area: ${props=> props.isLogin? 'content': 'unset'};
    height: ${props=> props.isLogin? '100vh': 'auto'};
    background: white;
    margin-top: ${props=> props.isLogin? '7.5rem': '0px'};
`;