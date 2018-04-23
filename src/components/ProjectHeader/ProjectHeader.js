import React, { Component } from 'react';
import { Header, Icon, Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { App } from '../../actions';

const options = [
  { key: 'cornsilk', text: 'cornsilk', value: 'cornsilk' },
  { key: 'brown', text: 'brown', value: 'brown' },
  { key: 'teal', text: 'teal', value: 'teal' },
];
class ProjectHeader extends Component {
  state= {
    backgroundColor: null,
  }

  changeBgColor = (e, { value }) => {
    const { dispatch } = this.props;

    return dispatch(App.bgColorChange(value));
  }

  render() {
    const { name, backgroundColor } = this.props;

    return (
      <StyledHeader as="h2" style={{ position: 'relative' }}>
        <Icon name="folder open outline" />
        <Header.Content>
          { name }
        </Header.Content>
        <Dropdown placeholder="color" inline options={options} onChange={this.changeBgColor} />
        <BackgroundOverlay backgroundColor={backgroundColor} />
      </StyledHeader>
    );
  }
}

export default connect()(ProjectHeader);

const StyledHeader = styled(({ className, children, ...rest }) => (
  <Header className={className} {...rest}>
    {children}
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
`;

