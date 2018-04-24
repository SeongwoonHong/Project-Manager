import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { colors } from 'utils/colors';

class Navigation extends Component {
  render() {
    return (
      <StyledMenu>
        <PM to="/" style={{ fontWeight: 'bold' }}><Icon name="desktop" size="big" />Project Manager</PM>
        <PM to="/signup"><Icon name="sign in" size="big" />Sign In</PM>
      </StyledMenu>
    );
  }
}

export default Navigation;

const StyledMenu = styled(({ className, children, ...rest }) => (
  <Menu className={className} {...rest}>
    {children}
  </Menu>
))`
  position: relative;
  
  && {
    border: none;
    border-radius: initial;
    background-color: ${colors.lightBlue};
  }
`;

const PM = styled(NavLink)`
  font-size: 16px;
  padding: 1rem;
  transition: all 0.2s ease-in;
  color: ${colors.white};

  .icon {
    color: ${colors.white};
    margin-right: 10px;
    transition: all 0.2s ease-in;
  }

  &:last-of-type {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
  }

  &:hover {
    background-color: rgba(55, 155, 215, 0.2);

    .icon {
      color: ${colors.teal};
    }
  }
`;

