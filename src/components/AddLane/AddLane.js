import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { Lanes, Project } from 'actions';
import { toast } from 'react-toastify';

import ClickOutside from 'components/ClickOutside/ClickOutside';

class AddLane extends Component {
  state = {
    isEditing: false,
    clickOutside: false,
    name: '',
  };

  onKeyDownHandler = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      return this.submitHandler();
    }
    if (e.keyCode === 27) {
      return this.resetState();
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

  handleTriggerClick = () => this.setState({ isEditing: !this.state.isEditing, clickOutside: false });

  changeHandler = (e, { name, value }) => this.setState({ [name]: value });

  resetState = () => this.setState({ name: '', isEditing: false });

  submitHandler = () => {
    const { name } = this.state;
    const { dispatch } = this.props;
    const id = shortid.generate();

    if (!name.trim()) {
      return toast.error('Name cannot be empty', {
        position: toast.POSITION_TOP_RIGHT,
      });
    }
    dispatch(Lanes.addLane(name, id));
    dispatch(Project.addLane(id));

    return this.resetState();
  };

  render() {
    const { isEditing, clickOutside, name } = this.state;

    return (
      <StyledAddLaneContainer>
        {isEditing && !clickOutside ? (
          <ClickOutside fetchClickOutside={this.handleClickOutside}>
            <Form>
              <Form.Field>
                <Form.Input
                  type="text"
                  name="name"
                  placeholder={name || ''}
                  value={name || ''}
                  onChange={this.changeHandler}
                  onKeyDown={this.onKeyDownHandler}
                />
                <Button
                  type="button"
                  onClick={this.resetState}
                  negative
                  icon="cancel"
                  labelPosition="right"
                  content="Cancel"
                  floated="left"
                />
                <Button
                  type="button"
                  positive
                  icon="checkmark"
                  labelPosition="right"
                  onClick={this.submitHandler}
                  content="Save"
                  floated="right"
                />
              </Form.Field>
            </Form>
          </ClickOutside>
        ) : (
          <Button positive onClick={this.handleTriggerClick}>
            Add a new lane
          </Button>
        )}
      </StyledAddLaneContainer>
    );
  }
}

export default connect()(AddLane);

const StyledAddLaneContainer = styled.div`
  width: 240px;
  display: inline-block;
  position: relative;
  margin-right: 2rem;
`;
