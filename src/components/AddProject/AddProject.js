import React, { Component } from 'react';
import { Card, Form, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { colors } from 'utils/colors';

class AddProject extends Component {
  state = {
    isEditing: false,
    name: ''
  }

  onClickHandler = () => {
    const { isEditing } = this.state;

    return !isEditing ? this.setState({ isEditing: true }) : false;
  }

  onChangeHandler = e => this.setState({ name: e.target.value })

  onCancelHandler = () => this.setState({ name: '', isEditing: false })

  handleSubmit = () => {
    const { name } = this.state;
    const { history } = this.props;

    if (!name.trim()) {
      return toast.error('Name cannot be empty', {
        position: toast.POSITION_TOP_RIGHT
      });
    }
    this.setState({ isEditing: false });

    return history.push(`/project/${name}`);
  }

  renderEditing = () => (
    <Form onSubmit={this.handleSubmit}>
      <Form.Field onChange={this.onChangeHandler}>
        <input placeholder="Project name" />
      </Form.Field>
      <Button type="submit" color="green">Create</Button>
      <Button type="button" color="green" onClick={this.onCancelHandler}>Cancel</Button>
    </Form>
  )

  renderNotEditing = () => (
    <Card.Header>
      Add a new project..
    </Card.Header>
  );

  render() {
    const { isEditing } = this.state;

    return (
      <StyledCard onClick={this.onClickHandler}>
        <Card.Content>
          { isEditing ? this.renderEditing() : this.renderNotEditing() }
        </Card.Content>
      </StyledCard>
    );
  }
}

export default withRouter(AddProject);

const StyledCard = styled(({ children, className, ...rest }) => (
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
    background-color: ${colors.lightTeal};

    &:hover {
      transform: translateY(-5px);
      background-color: ${colors.teal};
    }

    >.content {
      flex-grow: initial;

      .header {
        color: #fff;
      }
    }
  }
`;

