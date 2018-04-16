import React, { Component } from 'react';
import { Modal, Header, Card, Button, TextArea } from 'semantic-ui-react';
import styled from 'styled-components';

import { colors } from '../../utils/colors';

class IssueCard extends Component {
  state = {
    title: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
    description: '',
  }

  onDeleteHandler = () => {
    // will be implemented later..
  }

  onSaveHandler = () => {
    // will be implemented later..
  }

  onChangeDescriptionHandler = e => this.setState({ description: e.target.value })

  resetState = () => this.setState({ description: '' }); // later on, title should be clear

  render() {
    const { title, description } = this.state;

    return (
      <Modal
        trigger={
          <Card>
            <Card.Content description="Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum " />
          </Card>
        }
        closeIcon
        size="tiny"
        onClose={this.resetState}
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>Description</Header>
            <StyledTextArea
              autoHeight
              placeholder="Add a more detailed description..."
              onChange={this.onChangeDescriptionHandler}
              value={description}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button type="button" negative onClick={this.onDeleteHandler} icon="trash" labelPosition="right" content="Delete" />
          <Button type="button" positive icon="checkmark" labelPosition="right" onClick={this.onSaveHandler} content="Save" />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default IssueCard;

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

