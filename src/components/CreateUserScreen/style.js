import styled from "styled-components";

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1.5fr auto 1fr;
  grid-template-areas: "options verticalLineOne userForm verticalLineTwo usersList";
  .vlOne, .vlTwo {
    border-left: 1px solid black;
    /* height: 500px; */
    margin: 2rem 0px 3.5rem;
    grid-area: verticalLineOne;
  }

  .vlTwo {
    grid-area: verticalLineTwo;
  }
`;

export const CreateUserContainer = styled.div`

  grid-area: userForm;
  padding: 8.7rem 8rem 0px 7rem;
  
  p.label {
    color: black;
    text-align: left;
    font-size: 1.4rem;
    font-weight: 400;
    margin-bottom: 0.5rem !important;
  }

  .create-user-input {
    box-shadow: 1px 1px 1px 1px rgba(211, 194, 194, 0.25);
    background: #FFFFFF;
  }

  .create-user-button {
    max-width: 15rem;
    background: #464646;
    border-radius: 1rem;

    span {
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: 0.1rem;
    }
  }
`;
