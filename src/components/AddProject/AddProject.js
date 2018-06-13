import React, { Component } from 'react';
import { Card, Form, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { colors } from 'utils/colors';
import ProjectForm from './ProjectForm';

class AddProject extends Component {
  state = {
    isEditing: false,
    clickOutside: false
  };

  handleTriggerClick = () => {
    const { isEditing, clickOutside } = this.state;
    const { isDemo, history } = this.props;

    if (isDemo) {
      return history.push('/project/demo');
    }
    if (!clickOutside && !isEditing) {
      return this.setState({ isEditing: !isEditing });
    }
    if (clickOutside && !isEditing) {
      return this.setState({
        isEditing: !isEditing,
        clickOutside: false
      });
    }

    return false;
  };

  handleToggle = fetchingIsEditing => this.setState({ isEditing: fetchingIsEditing });

  handleClickOutside = (fetchingClickOutside, fetchingIsEditing = false) => (
    this.setState({
      clickOutside: fetchingClickOutside,
      isEditing: fetchingIsEditing
    })
  );

  renderEditing = () => (
    <div>
      <ProjectForm
        fetchClickOutside={this.handleClickOutside}
        onToggle={this.handleToggle}
        render={({ name, onSubmit, onChange, onCancel }) => (
          <Form>
            <Form.Field>
              <Form.Input
                type="text"
                name="name"
                placeholder="Project name"
                value={name || ''}
                onChange={onChange}
              />
              <Button positive floated="right" onClick={onSubmit}>
                Create
              </Button>
              <Button type="button" negative onClick={onCancel} floated="left">
                Cancel
              </Button>
            </Form.Field>
          </Form>
        )}
        {...this.props}
      />
    </div>
  );

  renderNotEditing = () => <Card.Header>{ this.props.isDemo ? 'See Demo' : 'Add a new project..' }</Card.Header>;

  render() {
    const { isEditing, clickOutside } = this.state;
    const { isDemo } = this.props;

    return (
      <StyledCard isDemo={isDemo} onClick={this.handleTriggerClick}>
        <Card.Content>
          {isEditing && !clickOutside
            ? this.renderEditing()
            : this.renderNotEditing()}
        </Card.Content>
      </StyledCard>
    );
  }
}

export default connect()(withRouter(AddProject));

const StyledCard = styled(({ children, className, isDemo, ...rest }) => (
  <Card className={className} {...rest}>
    {children}
  </Card>
))`
  &.ui.card {
    display: inline-flex;
    height: 140px;
    width: 260px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in;
    background-color: ${props => (props.isDemo ? colors.teal : colors.lightTeal)};

    &:hover {
      transform: translateY(-5px);
      background-color: ${colors.teal};
    }

    > .content {
      flex-grow: initial;

      .header {
        color: #fff;
      }
    }
  }
`;
