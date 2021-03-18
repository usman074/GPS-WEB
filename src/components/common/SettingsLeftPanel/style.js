import styled from "styled-components";

export const ContentWrapper = styled.div`
  grid-area: ${(props) => props.gridArea};
  padding: 8rem 6rem 0px 8rem;

  .settings-buttons {
    margin-bottom: 3rem;
    width: 20rem;
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
