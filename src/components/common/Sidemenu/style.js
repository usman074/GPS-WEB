import styled from "styled-components";
import { Drawer } from "antd";
import { SlimScrollStyle } from "../../../slimScrollStyle";

export const DrawerStyled = styled(Drawer)`
  .ant-drawer-title {
    color: white;
    font-weight: 700;
    font-size: 3rem;
  }

  .ant-drawer-body {
    ${SlimScrollStyle}
    align-items: flex-start !important;
  }

  .sidemenu-content-heading {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    background: white;
    color: black;
    cursor: text;
  }

  .vehicles {
    margin-bottom: 1rem;
    color: #6c6c6c;
  }

  .loc-update-btn {
    margin: 2rem auto;
    font-size: 1.2rem;
    background-color: #464646;
    color: #ffffff;
    max-width: 16rem;
    max-height: 3.3rem;
    border-radius: 1rem;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #464646;
    border-color: #464646;
  }

  .ant-checkbox.ant-checkbox-checked {
    &:hover {
      border-color: #464646;
    }
  }
  .ant-checkbox-checked::after, .ant-checkbox-wrapper:hover .ant-checkbox-inner  {
    border-color: #464646;

  }
`;
