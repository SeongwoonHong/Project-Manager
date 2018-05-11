import React, { Component } from 'react';
import { Header, Icon, Dropdown, DropdownItem } from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { App } from 'actions';
import { colors } from 'utils/colors';

const options = [
  { text: 'brown', value: 'brown', },
  { text: 'teal', value: 'teal', },
  { text: 'blue', value: 'blue', },
  { text: 'violet', value: 'violet', },
];

class ProjectHeader extends Component {
  changeBgColor = (e, { children }) => {
    const { dispatch } = this.props;

    return dispatch(App.bgColorChange(children[1]));
  }

  render() {
    const { name, app } = this.props;
    const { backgroundColor } = app;

    return (
      <StyledHeader as="h2">
        <Icon name="folder open outline" />
        <Header.Content>
          { name }
        </Header.Content>

        <Dropdown text="colors" inline>
          <Dropdown.Menu scrolling>
            { options.map(option => (
              <DropdownItem key={option.value} onClick={this.changeBgColor}>
                <Icon name="circle" color={option.value} />
                { option.text }
              </DropdownItem>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <BackgroundOverlay backgroundColor={backgroundColor} />
      </StyledHeader>
    );
  }
}

export default connect(state => ({
  app: state.App,
}))(ProjectHeader);

const StyledHeader = styled(({ className, children, ...rest }) => (
  <Header className={className} { ...rest }>
    { children }
  </Header>
))`
  &.ui.header {
    position: relative;

    i {
      display: inline-block;
    }

    .content {
      display: inline-block;
    }

    .ui.inline.dropdown {
      position: absolute;
      right: 0;
      top: 0;
      border: 2px solid ${colors.lightGrey};
      transition: all 0.2s ease-in;
      border-radius: 5px;

      .text {
        margin: 3px 7px;
        font-size: .8em;
        color:  ${colors.lightGrey};
      }

      >i {
        color: ${colors.lightGrey};
      }

      &:hover {
        border: 2px solid ${colors.lightGrey};

        .text {
          color: ${colors.lightBlue};
        }

        >.icon {
          color: ${colors.lightBlue};
        }
      }
    }
  }
`;

const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-color: ${props => props.backgroundColor};
  color: white;
`;

