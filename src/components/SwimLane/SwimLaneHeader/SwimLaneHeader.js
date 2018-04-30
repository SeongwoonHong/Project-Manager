import React, { Component } from 'react';
import { Icon, Form, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Project } from 'actions';
import { toast } from 'react-toastify';

class SwimLaneHeader extends Component {
  state = {
    content: '',
    isEditing: false,
  }

  onChangeHandler = (e, { name, value }) => this.setState({ [name]: value });

  onCancelHandler = () => this.setState({ isEditing: false });

  saveLane = () => {
    const { content } = this.state;
    const { dispatch } = this.props;

    if (!content.trim()) {
      return toast.error('Name cannot be empty', {
        position: toast.POSITION_TOP_RIGHT
      });
    }

    dispatch(Project.addLane(content));

    return this.setState({ isEditing: false });
  }

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
                  placeholder={content ? '' : 'Add a new list'}
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
                  onClick={this.saveLane}
                  content="Save"
                />
              </Form.Field>
            </Form>
        }
      </div>
    );
  }
}

export default connect()(SwimLaneHeader);

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

