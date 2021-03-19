import styled from "styled-components";

export const LoginWrapper = styled.div`
  background-image: url('BACKGROUND.png');
  background-repeat: no-repeat, repeat;
  background-position: center;
  background-size: 100% 100%; 
`;
export const LoginContainer = styled.div`
  display: grid;
  justify-content:center;
  height: 100vh;

  form {
    max-width: 490px;
    min-width: 300px;
  }
  h1.page-heading {
    color: #ffffff;
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 2rem !important;
    margin-top: 2rem !important;
    max-width: 30rem;
  }
  h1.form-heading {
    color: #ffffff;
    text-align: left;
    font-size: 2.6rem;
    margin-bottom: 2rem !important;
  }
  p.label {
    color: #ffffff;
    text-align: left;
    font-size: 1.7rem;
    font-weight: 700;
    margin-bottom: 0.5rem !important;
    letter-spacing: 0.1rem;
  }

  .login-button {
    max-width: 13rem;
    background: rgba(70, 70, 70, 0.5);
    border-radius: 1rem;

    span {
      font-size: 1.7rem;
      font-weight: 700;
      letter-spacing: 0.1rem;
      
    }
  }
`;
