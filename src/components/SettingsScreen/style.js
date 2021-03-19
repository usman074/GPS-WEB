import styled from "styled-components";

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1.5fr auto 1fr;
  grid-template-areas: "options verticalLineOne userForm verticalLineTwo usersList";
  .vlOne,
  .vlTwo {
    border-left: 1px solid black;
    /* height: 500px; */
    margin: 3rem 0px 3.5rem;
    grid-area: verticalLineOne;
  }

  .vlTwo {
    grid-area: verticalLineTwo;
  }

  @media (max-width: 1150px) {
    grid-template-columns: 1fr auto 1fr;
    grid-template-areas: "options options options" "userForm verticalLineTwo usersList";
    .vlOne {
      display: none;
    }
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
    background: #ffffff;
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

export const ListContainer = styled.div`
  grid-area: usersList;
  padding: 2rem 1rem 0px 1rem;

  @media (max-width: 1150px) {
  padding: 2rem 1rem 0px 2rem;

  }

  &.lang-list {
    padding: 2rem 3rem 0px 3rem;
  }
  .user-list-button {
    max-width: 16rem;
    height: 3.5rem;
    background: #464646;
    border-radius: 0.5rem;
    margin-bottom: 2rem !important;

    span {
      font-size: 1.5rem;
      font-weight: 400;
      letter-spacing: 0.1rem;
    }
  }

  .usersListWrapper {
    display: flex;
    position: relative;

    p {
      padding: 0.8rem;
      background: #f2f2f2;
      margin: 0px 1rem 1rem 0px !important;
      border-radius: 1rem;
      font-size: 1.3rem;
    }

    p.user-name,
    p.lang-name {
      width: 100%;
      text-align: left;
      color: #6c6c6c;
    }

    p.lang-name {
      margin: 0px !important;
    }

    .user-list-icons {
      position: absolute;
      right: 2rem;
      top: 0.5rem;
    }
  }
`;

export const LanguageListContainer = styled.div`
  padding: 6.4rem 6rem 0px 5rem;

  .ant-list-item {
    color: #6c6c6c;
    cursor: pointer;
  }
  .ant-list-item.selected {
    color: black;
  }

  .change-lang-button {
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

export const TermsContentWrapper = styled.div`
  p, .terms-input {
    text-align: left;
    padding: 9rem 8rem;

    color: #6c6c6c;
    font-size: 1.2rem;
  }

  .edit-terms-button {
    max-width: 15rem;
    background: #464646;
    border-radius: 1rem;

    span {
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: 0.1rem;
    }
  }

  .terms-input > textarea {
    border: none;
    font-size: 1.2rem;
    text-align: center;
  }
`;
