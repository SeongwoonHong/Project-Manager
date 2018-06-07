import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TextArea } from 'semantic-ui-react';
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
            <TextArea
              type="text"
              value={term}
              onChange={this.handleChange}
              size="tiny"
              autoHeight
              className="edit-input"
            />
            <Button size="tiny" onClick={this.toggleEditing} negative>
              Cancel
            </Button>
            <Button size="tiny" onClick={this.handleSave} positive>
              Save
            </Button>
          </div>
        ) : (
          <div className="comment-container">
            <pre className="comment">{comment}</pre>
            <div className="comment-info">
              <TimeAgo date={time} live={false} /> {isEdit ? <strong> (edited)</strong> : null}
            </div>
            <Button size="tiny" onClick={this.handleRemove} negative>
              Remove
            </Button>
            <Button size="tiny" onClick={this.toggleEditing} positive>
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
  .edit-input, .comment {
    margin: 0;
    width: 100%;
    display: block;

    &:focus {
      outline: none;
    }
  }
  
  .edit-input {
    margin-bottom: 5px;
    border: 1px solid rgb(211,211,211);
  }

  .comment-info {
    font-size: 12px;
  }

  time {
    font-size: 12px;
    line-height: 24px;
  }
`;
