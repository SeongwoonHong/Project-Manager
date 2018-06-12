import React, { Component } from 'react';
import shortid from 'shortid';
import { Lanes, Project } from 'actions';
import WithClickOutside from '../withHOC/WithClickOutside';

class LaneForm extends Component {
  state = { name: '' };
  onKeyDownHandler = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      return this.submitHandler();
    }
    if (e.keyCode === 27) {
      return this.resetState();
    }
    return false;
  };

  changeHandler = (e, { name, value }) => this.setState({ [name]: value });

  resetState = () =>
    this.setState({ name: '' }, () => this.props.onToggle(false));

  submitHandler = () => {
    const { name } = this.state;
    const { dispatch } = this.props;
    const id = shortid.generate();

    dispatch(Lanes.addLane(name, id));
    dispatch(Project.addLane(id));

    return this.resetState();
  };
  render() {
    return this.props.render({
      name: this.state.name,
      onKeyDown: this.onKeyDownHandler,
      onChange: this.changeHandler,
      onReset: this.resetState,
      onAddLane: this.submitHandler
    });
  }
}
const WithClickOutsideLaneForm = WithClickOutside(LaneForm);

export default WithClickOutsideLaneForm;
