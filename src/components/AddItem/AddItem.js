import React, { Component } from 'react';
import { Icon, Form, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';

class AddItem extends Component {
  state = {
    isEditing: false,
    content: '',
  }

  onChangeHandler = (e, { name, value }) => this.setState({ [name]: value });

  onCancelHandler = () => this.setState({ isEditing: false });

  render() {
    const { isEditing, content } = this.state;

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
                  name="content"
                  placeholder={content ? '' : 'Add a new card'}
                  value={content || ''}
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
                  // onClick={() => addCard(content)}
                  content="Save"
                />
              </Form.Field>
            </Form>
        }
      </div>
    );
  }
}

export default connect()(AddItem);

const StyledIconContainer = styled.div`
  position: relative;

  .icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
`;

