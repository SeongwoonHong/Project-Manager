import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';

import { Cards } from 'actions';

class EditComment extends Component {

  state = { editing: this.props.currentComment.comment }

  handleChange = (e, data) => {
    this.setState({ editing: data.value });
  }

  handleEdit = () => {
    const { dispatch, cardId, currentComment } = this.props;

    return dispatch(Cards.editComment(cardId, currentComment));
  }

  handleSave = () => {
    const { dispatch, cardId, currentComment } = this.props;
    const { editing } = this.state;

    return dispatch(Cards.updateComment(cardId, currentComment, editing));
  }

  handleRemove = () => {
    const { dispatch, cardId, currentComment: { time } } = this.props;

    return dispatch(Cards.removeComment(cardId, time));
  }

  render() {
    const { editing } = this.state;
    const { comment, time, isEdit } = this.props.currentComment;
    return (
      <div key={time}>
        {
          isEdit ?
            <div>
              <Input
                type="text"
                value={editing}
                onChange={this.handleChange}
                size="tiny"
              />
              <Button
                size="tiny"
                onClick={this.handleSave}
                positive
              >
                Save
              </Button>
              <Button
                size="tiny"
                onClick={this.handleEdit}
                negative
              >
                Cancel
              </Button>
            </div>
            :
            <div>
              {comment}
              { ' ' }
              <TimeAgo date={time} live={false} />
              <Button
                size="tiny"
                onClick={this.handleEdit}
                positive
              >
                Edit
              </Button>
              <Button
                size="tiny"
                onClick={this.handleRemove}
                negative
              >
                Remove
              </Button>
            </div>
        }
      </div>
    );
  }
}
export default connect()(EditComment);
