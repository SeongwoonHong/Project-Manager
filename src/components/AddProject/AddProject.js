import React, { Component } from 'react';
import { Card, Form, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { Project } from 'actions';
import { colors } from 'utils/colors';
import ClickOutside from 'components/ClickOutside/ClickOutside';

class AddProject extends Component {
  state = {
    isEditing: false,
    clickOutside: false,
    name: '',
  };

  onChangeHandler = e => this.setState({ name: e.target.value });

  onCancelHandler = () => this.setState({ name: '', isEditing: false });

  handleSubmit = () => {
    const { name } = this.state;
    const { history, dispatch } = this.props;

    if (!name.trim()) {
      return toast.error('Name cannot be empty', {
        position: toast.POSITION_TOP_RIGHT
      });
    }
    dispatch(Project.deleteProject());
    dispatch(Project.addProject(name));

    return history.push(`/project/${name}`);
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

  handleClickOutside = (fetchingClickOutside, fetchingIsEditing = false) => (
    this.setState({
      clickOutside: fetchingClickOutside,
      isEditing: fetchingIsEditing,
      name: '',
    })
  );

  renderEditing = () => (
    <ClickOutside fetchClickOutside={this.handleClickOutside}>
      <Form>
        <Form.Field>
          <Form.Input
            type="text"
            name="name"
            placeholder="Project name"
            value={this.state.name || ''}
            onChange={this.onChangeHandler}
          />
          <Button positive floated="right" onClick={this.handleSubmit}>
            Create
          </Button>
          <Button type="button" negative onClick={this.onCancelHandler} floated="left">
            Cancel
          </Button>
        </Form.Field>
      </Form>
    </ClickOutside>
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
