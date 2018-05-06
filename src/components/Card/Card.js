import React, { Component } from 'react';
import { Modal, Header, Card as SemanticCard, Button, TextArea } from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { colors } from 'utils/colors';
import { Cards, Lanes } from 'actions';

class Card extends Component {
  state = {
    title: '',
    description: '',
    modalOpen: false,
    ...this.props.data,
  }

  onSaveHandler = () => {
    const { title, description } = this.state;
    const { dispatch } = this.props;
    const { cardId } = this.props.data;

    if (!title.trim()) {
      return toast.error('Title cannot be empty', {
        position: toast.POSITION_TOP_RIGHT
      });
    }

    dispatch(Cards.updateCard(cardId, title, description));

    return this.setState({ modalOpen: false });
  }

  onChangeHandler = (e, { name, value }) => this.setState({ [name]: value });

  deleteHandler = () => {
    const { cardId } = this.props.data;
    const { dispatch, laneId } = this.props;

    dispatch(Cards.deleteCard(cardId));
    dispatch(Lanes.deleteCard(laneId, cardId));

    return this.setState({ modalOpen: false });
  }

  resetState = () => this.setState({ title: this.props.data.title, description: this.props.data.description || '' });

  closeModal = () => this.setState({ modalOpen: false, title: this.props.data.title, description: this.props.data.description || '' });

  openModal = () => this.setState({ modalOpen: true });

  render() {
    const { modalOpen, description } = this.state;
    const { title } = this.props.data;

    return (
      <Modal
        trigger={
          <SemanticCard onClick={this.openModal}>
            <SemanticCard.Content description={title} />
          </SemanticCard>
        }
        open={modalOpen}
        size="tiny"
        onClose={this.resetState}
      >
        <Modal.Header>
          <StyledTextArea
            name="title"
            value={this.state.title}
            autoHeight
            onChange={this.onChangeHandler}
          />
        </Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>Description</Header>
            <StyledTextArea
              autoHeight
              name="description"
              placeholder="Add a more detailed description..."
              onChange={this.onChangeHandler}
              value={description}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button type="button" negative onClick={this.closeModal} icon="cancel" labelPosition="left" content="Cancel" floated="left" />
          <Button type="button" negative icon="trash" onClick={this.deleteHandler} labelPosition="right" content="Delete" />
          <Button type="button" positive icon="checkmark" labelPosition="right" onClick={this.onSaveHandler} content="Save" />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect()(Card);

const StyledTextArea = styled(({ className, children, ...rest }) => (
  <TextArea className={className} {...rest}>
    {children}
  </TextArea>
))`
  width: 100%;
  color: ${colors.grey};
  box-shadow: -7px 10px 55px -19px rgba(0,0,0,0.75);
  border-radius: 5px;
  padding: 5px;
  border: 1px solid ${colors.lightGrey};
`;

