import styled from "styled-components";

export const ContentWrapper = styled.div`
  grid-area: ${(props) => props.gridArea};
  padding: 8rem 4rem 0px 6rem;

  @media (max-width: 1150px) {
    display: flex;
    justify-content: space-between;
  }

  .settings-buttons {
    margin: 0px 1rem 3rem 0px;
    min-width: 20rem;
    max-height: 4.5rem;
    background: #F8F8F8;
    color: #464646;
    font-weight: 400;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    span {
    font-size: 1.2rem;
    }
    &.active {
      background: #464646;
      color: white;
    }
  }
`;
