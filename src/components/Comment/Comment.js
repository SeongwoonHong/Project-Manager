import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TextArea } from 'semantic-ui-react';
import styled from 'styled-components';
import TimeAgo from 'react-timeago';

import { Cards } from '../../actions';
import { colors } from '../../utils/colors';


class Comment extends Component {

  state = { comment: '', }

  onChangeHandler = e => this.setState({ comment: e.target.value })

  getComment = () => {
    const { cards, cardId } = this.props;

    return cards[cardId].comment.map((singleComment) => {
      const index = singleComment.indexOf(':');
      const comment = singleComment.slice(0, index);
      const time = singleComment.slice(index + 1).valueOf();

      return (
        <div className="comments__container--each" key={time}>
          <li className="comments__container--each_li" >
            {`${comment}  `}
            <TimeAgo date={time} />
          </li>
        </div>
      );
    });
  }

  commentSaveHandler = () => {
    const { dispatch, cardId } = this.props;
    const { comment } = this.state;

    dispatch(Cards.addComment(cardId, `${comment}:${new Date()}`));

    return this.setState({ comment: '' });
  }


  fometter = () => {

  }

  render() {
    const { comment } = this.state;
    const { cards, cardId } = this.props;

    return (
      <CommentsContainer>
        <div className="comment">
          <StyledTextArea
            className="comment__input"
            size="medium"
            name="comment"
            placeholder="Add comments..."
            onChange={this.onChangeHandler}
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
            floated="right"
            disabled={!comment }
          />
        </div>
        <div className="comments__container">
          {cards[cardId].comment && this.getComment() }
        </div>
      </CommentsContainer>
    );
  }
}
export default connect(state => ({
  cards: state.Cards,
}))(Comment);

const CommentsContainer = styled.div`
  .comment {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    }
    &__button{
      grid-row: 1 / -1;
      grid-column: 4;
    }
  }
  .comments__container {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    line-height: 1.7rem;

    &--each {
      min-width: 5%;
      max-width: max-content;
      border: 1px solid white;
      line-height: 1.7rem;
      margin: 5px 5px;
      background-color: #f0fff7;
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
  width: 77%;
  color: ${colors.grey};
  box-shadow: -7px 10px 55px -19px rgba(0,0,0,0.75);
  border-radius: 5px;
  padding: 5px;
  border: 1px solid ${colors.lightGrey};
`;
