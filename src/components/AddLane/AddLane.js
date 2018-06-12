import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import LaneForm from './LaneForm';

class AddLane extends Component {
  state = {
    isEditing: false,
    clickOutside: false
  };

  fetchingToggle = isEditingOnOutsideClick => this.setState({ isEditing: isEditingOnOutsideClick });

  handleClickOutside = (fetchingClickOutside, fetchingIsEditing = false) => (
    this.setState({
      clickOutside: fetchingClickOutside,
      isEditing: fetchingIsEditing
    })
  );

  handleTriggerClick = () => this.setState({ isEditing: !this.state.isEditing, clickOutside: false });

  render() {
    const { isEditing, clickOutside } = this.state;

    return (
      <StyledAddLaneContainer>
        {isEditing && !clickOutside ? (
          <LaneForm
            fetchClickOutside={this.handleClickOutside}
            onToggle={this.fetchingToggle}
            render={({ name, onKeyDown, onChange, onReset, onAddLane }) => (
              <Form>
                <Form.Field>
                  <Form.Input
                    type="text"
                    name="name"
                    placeholder={name || ''}
                    value={name || ''}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                  />
                  <Button
                    type="button"
                    onClick={onReset}
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
                    onClick={onAddLane}
                    content="Save"
                    floated="right"
                  />
                </Form.Field>
              </Form>
            )}
            {...this.props}
          />
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
