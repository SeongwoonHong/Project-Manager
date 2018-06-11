import React, { Component } from 'react';
import { toast } from 'react-toastify';
import shortid from 'shortid';
import { Cards, Lanes } from 'actions';
import WithClickOutside from '../withHOC/WithClickOutside.js';

class CardForm extends Component {
  static defaultProps = {
    clickOutside: false,
    onToggle: () => {},
    laneId: ''
  };
  state = { title: '' };

  onKeyDownHandler = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      return this.addCardHandler();
    }

    if (e.keyCode === 27) {
      return this.resetState();
    }

    return false;
  };

  onChangeHandler = (e, { name, value }) => this.setState({ [name]: value });

  resetState = () => {
    this.setState({ title: '' }, () => this.props.onToggle(false));
  };

  addCardHandler = () => {
    const { dispatch, laneId } = this.props;
    const { title } = this.state;
    const cardId = shortid.generate();

    if (!title.trim()) {
      return toast.error('Title cannot be empty', {
        position: toast.POSITION_TOP_RIGHT
      });
    }
    dispatch(Cards.addCard(title, cardId));
    dispatch(Lanes.addCard(laneId, cardId));

    return this.resetState();
  };

  render() {
    return this.props.render({
      title: this.state.title,
      onChange: this.onChangeHandler,
      onAddCard: this.addCardHandler,
      onKeyDown: this.onKeyDownHandler,
      onReset: this.resetState
    });
  }
}

const WithClickOutsideCardForm = WithClickOutside(CardForm);

export default WithClickOutsideCardForm;
