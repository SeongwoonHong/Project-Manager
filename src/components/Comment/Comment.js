import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TextArea, Divider } from 'semantic-ui-react';
import styled from 'styled-components';

import { Cards } from 'actions';
import { colors } from 'utils/colors';
import EditComment from 'components/EditComment/EditComment';

class Comment extends Component {
  state = {
    comment: '',
  };

  onChangeHandler = e => this.setState({ comment: e.target.value });

  getComment = () => {
    const { comments, cardId } = this.props;

    return (
      comments.map(comment => (
        <div className="comments__container--each" key={comment.time}>
          <EditComment
            comment={comment.comment}
            time={comment.time}
            isEdit={comment.isEdit}
            cardId={cardId}
          />
        </div>
      ))
    );
  };

  commentSaveHandler = () => {
    const { dispatch, cardId } = this.props;
    const { comment } = this.state;
    const time = new Date();

    dispatch(Cards.addComment(cardId, comment.trim(), time));

    return this.setState({ comment: '' });
  };

  render() {
    const { comment } = this.state;

    return (
      <CommentsContainer>
        <div className="comment">
          <StyledTextArea
            className="comment__input"
            size="medium"
            name="comment"
            placeholder="Add comments..."
            onChange={this.onChangeHandler}
            autoHeight
            value={comment}
          />
          <Button
            className="comment__button"
            type="button"
            size="mini"
            onClick={this.commentSaveHandler}
            icon="save"
            labelPosition="right"
            positive
            content="Save"
            disabled={!comment.trim()}
          />
        </div>
        <Divider />
        <div className="comments__container">
          { this.getComment() }
        </div>
      </CommentsContainer>
    );
  }
}
export default connect(state => ({
  cards: state.Cards
}))(Comment);

const CommentsContainer = styled.div`
  .comment__button {
    width: 100%;
    margin-top: 5px;
  }

  .comments__container {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    line-height: 1.7rem;

    &--each {
      min-width: 5%;
      line-height: 1.7rem;
      margin: 5px 0px;
      color: ${colors.grey};
      overflow-wrap: break-word;
    }
  }
`;

const StyledTextArea = styled(({ className, children, ...rest }) => (
  <TextArea className={className} {...rest}>
    {children}
  </TextArea>
))`
  display: block;
  width: 100%;
  color: ${colors.grey};
  box-shadow: -7px 10px 55px -19px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  padding: 5px;
  border: 1px solid ${colors.lightGrey};

  &:focus {
    outline: none;
  }
`;

