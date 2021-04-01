import styled from "styled-components";

export const IntervalContainer = styled.div`
  max-width: 50rem;
  margin: auto;

  .interval-wrapper {
    display: grid;
    grid-template-columns: 1fr 7rem 7rem;
    grid-gap: 1.5rem;

    div {
      margin-bottom: 0px !important;
    }
    .ant-input {
      padding: 0px;
      background: transparent;
      color: #464646;
      &::placeholder {
        color: #6c6c6c !important;
      }
    }
    .interval-input {
      position: relative;
      padding: 0.8rem;
      background: #f8f8f8;
      margin-bottom: 1rem !important;
      border-radius: 1rem;
      font-size: 1.3rem;
      box-shadow: 1px 1px 1px 1px rgba(211, 194, 194, 0.25);
      color: #464646;
      text-align: left;

      span {
        position: absolute;
        right: 0.5rem;
        bottom: 0rem;
      }
    }

    .error {
      background: transparent;
      box-shadow: none;
    }
  }

  p {
    position: relative;
    padding: 0.8rem;
    background: #f8f8f8;
    margin-bottom: 1rem !important;
    border-radius: 1rem;
    font-size: 1.3rem;
    box-shadow: 1px 1px 1px 1px rgba(211, 194, 194, 0.25);
    color: #464646;
    text-align: left;
    max-height: 4rem;

    sub {
      position: absolute;
      right: 0.5rem;
      bottom: 1rem;
    }
  }

  .dropdown-icon {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }

  .dropdown-list {
    position: absolute;
    right: -8px;
    bottom: -7px;
    z-index: 1;
    margin: 0 !important;
    padding: 0px 0.2rem;
    border-radius: 0.5rem;
    box-shadow: none;
    background-color: #464646;
    color: white;
    height: 1.7rem;
    font-size: 1rem;
    cursor: pointer;
  }

  .interval-save-button {
    max-width: 16rem;
    height: 3.5rem;
    background: #464646;
    border-radius: 0.5rem;
    margin-top: 2rem !important;

    span {
      font-size: 1.5rem;
      font-weight: 400;
      letter-spacing: 0.1rem;
    }
  }
`;
