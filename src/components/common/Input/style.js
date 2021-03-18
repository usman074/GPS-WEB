import styled from "styled-components";
import { Input } from "antd";

export const StyledInput = styled(Input)`
  width: 100%;
  border-radius: 0.7rem;
  min-height: 4rem;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
  border: none;
  &::placeholder {
    color: #6C6C6C;
  }
`;

export const InputWrapper = styled.div`
    margin-bottom: 2rem;
  .error {
    text-align: left;
    color: red !important;
  }
`;
