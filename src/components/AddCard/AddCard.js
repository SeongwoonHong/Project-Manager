import React from 'react';
import { Icon, Form, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import CardForm from './CardForm.js';

class AddCard extends React.Component {
  static defaultProps = { laneId: '' };
  state = {
    isEditing: false,
    clickOutside: false
  };

  handleToggle = fetchingIsEditing =>
    this.setState({ isEditing: fetchingIsEditing });

  handleClickOutside = (fetchingClickOutside, fetchingIsEditing = false) => {
    this.setState({
      clickOutside: fetchingClickOutside,
      isEditing: fetchingIsEditing
    });
  };

  handleTriggerClick = () =>
    this.setState({ isEditing: !this.state.isEditing, clickOutside: false });

  render() {
    const { isEditing, clickOutside } = this.state;
    return (
      <StyledDiv>
        {isEditing && !clickOutside ? (
          <CardForm
            fetchClickOutside={this.handleClickOutside}
            onToggle={this.handleToggle}
            render={({ title, onChange, onAddCard, onKeyDown, onReset }) => (
              <Form>
                <Form.Field>
                  <Form.Input
                    type="text"
                    name="title"
                    placeholder={title ? '' : 'Add a new card'}
                    value={title || ''}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                  />
                  <Button
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
                    onClick={onAddCard}
                    content="Save"
                    floated="right"
                  />
                </Form.Field>
              </Form>
            )}
            {...this.props}
          />
        ) : (
          <StyledIconContainer>
            <Icon name="plus" size="large" onClick={this.handleTriggerClick} />
          </StyledIconContainer>
        )}
      </StyledDiv>
    );
  }
}

export default connect()(AddCard);

const StyledDiv = styled.div`
  margin-bottom: 2rem;
`;

const StyledIconContainer = styled.div`
  position: relative;

  .icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.3);
  }
`;
