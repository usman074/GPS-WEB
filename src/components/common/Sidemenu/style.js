import styled from "styled-components";
import { Drawer } from "antd";
import {SlimScrollStyle} from '../../../slimScrollStyle';

export const DrawerStyled = styled(Drawer)`
  .ant-drawer-title {
    color: white;
    font-weight: 700;
    font-size: 3rem;
  }

  .ant-drawer-body {
      ${SlimScrollStyle}
  }

  .sidemenu-content-heading {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    background: white;
    color: black;
  }

  .vehicles {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: #6c6c6c;
    background: white;
    max-width: 16rem;
    max-height: 3.3rem;
    border-radius: 1rem;
  }
`;

