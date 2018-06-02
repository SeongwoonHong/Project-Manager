import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';
import styled from 'styled-components';

import { Cards } from 'actions';

class EditComment extends Component {
  static defaultProps = {
    comment: '',
    time: 0,
    isEdit: false,
    cardId: ''
  };
  state = {
    editing: false,
    term: this.props.comment,
  };

  toggleEditing = () => this.setState({ editing: !this.state.editing, term: this.props.comment });

  handleChange = (e, data) => this.setState({ term: data.value });

  handleSave = () => {
    const { dispatch, cardId, comment, time } = this.props;
    const { term } = this.state;

    if (comment !== term) {
      dispatch(Cards.updateComment(cardId, time, term));
    }

    return this.toggleEditing();
  };

  handleRemove = () => {
    const { dispatch, cardId, time } = this.props;

    dispatch(Cards.removeComment(cardId, time));

    return this.toggleEditing();
  };

  render() {
    const { editing, term } = this.state;
    const { comment, time, isEdit } = this.props;

    return (
      <StyledEditComment>
        {editing ? (
          <div className="comment-edit">
            <Input
              type="text"
              value={term}
              onChange={this.handleChange}
              size="tiny"
              style={{ flexGrow: 1 }}
              className="edit-input"
            />
            <Button size="tiny" onClick={this.toggleEditing} negative floated="right">
              Cancel
            </Button>
            <Button size="tiny" onClick={this.handleSave} positive floated="right">
              Save
            </Button>
          </div>
        ) : (
          <div className="comment-container">
            <span className="comment">{comment} <TimeAgo date={time} live={false} /></span>
            {isEdit ? '  (edited)' : null}
            <Button size="tiny" onClick={this.handleRemove} negative floated="right">
              Remove
            </Button>
            <Button size="tiny" onClick={this.toggleEditing} positive floated="right">
              Edit
            </Button>
          </div>
        )}
      </StyledEditComment>
    );
  }
}

export default connect()(EditComment);

const StyledEditComment = styled.div`
  .comment-edit, .comment-container {
    display: flex;
    align-items: center;
  }

  .edit-input, .comment {
    flex-grow: 1;
  }
  
  time {
    font-size: 12px;
    line-height: 24px;
    margin-left: 5px;
  }
`;
