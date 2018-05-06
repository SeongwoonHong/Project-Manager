import React, { Component } from 'react';
import { Icon, Form, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import shortid from 'shortid';

import { Cards, Lanes } from 'actions';

class AddCard extends Component {
  state = {
    isEditing: false,
    title: '',
  }

  onChangeHandler = (e, { name, value }) => this.setState({ [name]: value });

  onCancelHandler = () => this.setState({ isEditing: false, title: '' });

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

    return this.setState({ isEditing: false, title: '' });
  }

  render() {
    const { isEditing, title } = this.state;

    return (
      <div>
        {
          !isEditing ?
            <StyledIconContainer>
              <Icon name="plus" size="large" onClick={() => this.setState({ isEditing: true })} />
            </StyledIconContainer> :
            <Form>
              <Form.Field>
                <Form.Input
                  type="text"
                  name="title"
                  placeholder={title ? '' : 'Add a new card'}
                  value={title || ''}
                  onChange={this.onChangeHandler}
                />
                <Button
                  type="button"
                  negative
                  onClick={this.onCancelHandler}
                  icon="trash"
                  labelPosition="right"
                  content="Cancel"
                />
                <Button
                  type="button"
                  positive
                  icon="checkmark"
                  labelPosition="right"
                  onClick={this.addCardHandler}
                  content="Save"
                />
              </Form.Field>
            </Form>
        }
      </div>
    );
  }
}

export default connect()(AddCard);

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

