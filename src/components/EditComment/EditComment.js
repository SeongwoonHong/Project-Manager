import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';

import { Cards } from 'actions';

class EditComment extends Component {
  static defaultProps = { comment: '', time: 0, isEdit: false, cardId: '' };
  state = this.initialState;
  initialState = { editing: false, term: this.props.comment };

  toggleEditing = () => {
    this.setState(({ editing }) => ({ editing: !editing }));
  };

  handleChange = (e, data) => {
    this.setState({ term: data.value });
  };

  handleSave = () => {
    const { dispatch, cardId, comment, isEdit, time } = this.props;
    const { term } = this.state;

    if (comment !== term) {
      dispatch(Cards.updateComment(cardId, time, term, isEdit));
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
      <div key={time}>
        {editing ? (
          <div>
            <Input
              type="text"
              value={term}
              onChange={this.handleChange}
              size="tiny"
            />
            <Button size="tiny" onClick={this.handleSave} positive>
              Save
            </Button>
            <Button size="tiny" onClick={this.toggleEditing} negative>
              Cancel
            </Button>
          </div>
        ) : (
          <div>
            {comment} <TimeAgo date={time} live={false} />
            <Button size="tiny" onClick={this.toggleEditing} positive>
              Edit
            </Button>
            <Button size="tiny" onClick={this.handleRemove} negative>
              Remove
            </Button>
            {isEdit ? '  edited' : null}
          </div>
        )}
      </div>
    );
  }
}
export default connect()(EditComment);
