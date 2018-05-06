import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Lanes, Project } from 'actions';
import shortid from 'shortid';

class AddLane extends Component {
  state = {
    isEditing: false,
    name: '',
  }

  changeHandler = (e, { name, value }) => this.setState({ [name]: value });

  cancelHandler = () => this.setState({ isEditing: false, name: '' });

  submitHandler = () => {
    const { name } = this.state;
    const { dispatch } = this.props;
    const id = shortid.generate();

    dispatch(Lanes.addLane(name, id));
    dispatch(Project.addLane(id));

    return this.setState({ isEditing: false, name: '' });
  }

  render() {
    const { isEditing, name } = this.state;

    return (
      <StyledAddLaneContainer>
        {
          !isEditing ?
            <Button positive onClick={() => this.setState({ isEditing: true })}>Add a new lane</Button>
            :
            <Form>
              <Form.Field>
                <Form.Input
                  type="text"
                  name="name"
                  placeholder={name || ''}
                  value={name || ''}
                  onChange={this.changeHandler}
                />
                <Button
                  type="button"
                  negative
                  onClick={this.cancelHandler}
                  icon="trash"
                  labelPosition="right"
                  content="Cancel"
                />
                <Button
                  type="button"
                  positive
                  icon="checkmark"
                  labelPosition="right"
                  onClick={this.submitHandler}
                  content="Save"
                />
              </Form.Field>
            </Form>
        }
      </StyledAddLaneContainer>
    );
  }
}

export default connect()(AddLane);

const StyledAddLaneContainer = styled.div`
  width: 240px;
  display: inline-block;
  position: relative;
`;
