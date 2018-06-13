import React from 'react';
import { Icon, Form, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import shortid from 'shortid';
import { Cards, Lanes } from 'actions';

import ClickOutside from 'components/ClickOutside/ClickOutside';

class AddCard extends React.Component {
  static defaultProps = {
    laneId: ''
  };

  state = {
    isEditing: false,
    clickOutside: false,
    title: '',
  };

  onKeyDownHandler = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      return this.addCardHandler();
    }

    if (e.keyCode === 27) {
      return this.resetState();
    }

    return false;
  };

  onChangeHandler = (e, { name, value }) => this.setState({ [name]: value });

  resetState = () => this.setState({ title: '' }, () => this.handleToggle(false));

  addCardHandler = () => {
    const { dispatch, laneId } = this.props;
    const { title } = this.state;
    const cardId = shortid.generate();

    if (!title.trim()) {
      return toast.error('Title cannot be empty', {
        position: toast.POSITION_TOP_RIGHT
      });
    }
    dispatch(Cards.addCard(title, cardId));
    dispatch(Lanes.addCard(laneId, cardId));

    return this.resetState();
  };

  handleToggle = fetchingIsEditing => this.setState({ isEditing: fetchingIsEditing });

  handleClickOutside = (fetchingClickOutside, fetchingIsEditing = false) => (
    this.setState({
      clickOutside: fetchingClickOutside,
      isEditing: fetchingIsEditing,
      title: '',
    })
  );

  handleTriggerClick = () => this.setState({ isEditing: !this.state.isEditing, clickOutside: false });

  render() {
    const { isEditing, clickOutside, title } = this.state;

    return (
      <StyledDiv>
        {isEditing && !clickOutside ? (
          <ClickOutside fetchClickOutside={this.handleClickOutside}>
            <Form>
              <Form.Field>
                <Form.Input
                  type="text"
                  name="title"
                  placeholder={title ? '' : 'Add a new card'}
                  value={title || ''}
                  onChange={this.onChangeHandler}
                  onKeyDown={this.onKeyDownHandler}
                />
                <Button
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
                  onClick={this.addCardHandler}
                  content="Save"
                  floated="right"
                />
              </Form.Field>
            </Form>
          </ClickOutside>
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
