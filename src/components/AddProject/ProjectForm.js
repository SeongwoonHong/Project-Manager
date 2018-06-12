/* eslint-disable */
import React, { Component } from 'react';
import { toast } from 'react-toastify';

import { Project } from 'actions';
import WithClickOutside from 'components/withHOC/WithClickOutside';

class ProjectForm extends Component {
  state = {
    name: ''
  };

  onChangeHandler = e => this.setState({ name: e.target.value });

  onCancelHandler = () => this.setState({ name: '' }, () => this.props.onToggle(false));

  handleSubmit = () => {
    const { name } = this.state;
    const { history, dispatch } = this.props;

    if (!name.trim()) {
      return toast.error('Name cannot be empty', {
        position: toast.POSITION_TOP_RIGHT
      });
    }
    dispatch(Project.deleteProject());
    dispatch(Project.addProject(name));

    return history.push(`/project/${name}`);
  };

  render() {
    return this.props.render({
      name: this.state.name,
      onSubmit: this.handleSubmit,
      onChange: this.onChangeHandler,
      onCancel: this.onCancelHandler
    });
  }
}
const WithClickOutsideProjectForm = WithClickOutside(ProjectForm);

export default WithClickOutsideProjectForm;
