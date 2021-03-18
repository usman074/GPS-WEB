import styled from "styled-components";

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 3rem 2rem 5rem;
  background: #F8F8F8 !important;

  .header-buttons {
    width: 15rem;
    max-height: 3.5rem;
    background: white;
    color: black;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;

    &.active {
      background: #464646;
      color: white;
    }
  }

  span {
    display: flex;
    align-items: center;
    p {
      color: red;
      margin-left: 1rem !important;
    }

    @media (max-width: 1060px) {
        margin-left: 1rem;
      p {
        display: none;
      }
    }
  }
`;
