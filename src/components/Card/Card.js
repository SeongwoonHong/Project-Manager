import React, { Component } from 'react';
import { Modal, Header, Card as SemanticCard, Button, TextArea } from 'semantic-ui-react';
import styled from 'styled-components';

import { colors } from 'utils/colors';

class Card extends Component {
  state = {
    title: '',
    description: '',
    modalOpen: false,
    modalTitle: '',
    modalDescription: '',
    ...this.props,
  }

  onSaveHandler = () => (
    this.setState({
      title: this.state.modalTitle,
      description: this.state.modalDescription,
      modalOpen: false,
    })
  )

  onChangeHandler = (e, { name, value }) => this.setState({ [name]: value });

  resetState = () => this.setState({ modalTitle: '', modalDescription: '' }); // later on, title should be clear

  closeModal = () => this.setState({ modalOpen: false });

  openModal = () => this.setState({ modalOpen: true });

  render() {
    const { title, modalOpen, modalTitle, modalDescription } = this.state;

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
        closeOnDimmerClick={this.closeModal}
      >
        <Modal.Header>
          <StyledTextArea
            name="modalTitle"
            value={modalTitle}
            autoHeight
            onChange={this.onChangeHandler}
          />
        </Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>Description</Header>
            <StyledTextArea
              autoHeight
              name="modalDescription"
              placeholder="Add a more detailed description..."
              onChange={this.onChangeHandler}
              value={modalDescription}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button type="button" negative onClick={this.closeModal} icon="cancel" labelPosition="left" content="Cancel" floated="left" />
          <Button type="button" negative icon="trash" labelPosition="right" content="Delete" />
          <Button type="button" positive icon="checkmark" labelPosition="right" onClick={this.onSaveHandler} content="Save" />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default Card;

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

