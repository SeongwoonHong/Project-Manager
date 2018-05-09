import React, { Component } from 'react';
import { Modal, Header, Card as SemanticCard, Button, TextArea, Icon, Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import shortid from 'shortid';

import { colors } from 'utils/colors';
import { Cards, Lanes, Labels } from 'actions';

const labelOptions = [
  { text: 'Green', value: 'green', icon: 'thumbs up' },
  { text: 'Blue', value: 'blue', icon: 'star' },
  { text: 'Orange', value: 'orange', icon: 'idea' },
  { text: 'Red', value: 'red', icon: 'warning' },
  { text: 'Pink', value: 'pink', icon: 'heart' },
  { text: 'Olive', value: 'olive', icon: 'conversation' },
];

class Card extends Component {
  state = {
    title: '',
    description: '',
    modalOpen: false,
    selectedLabels: [],
    ...this.props,
  }

  onSaveHandler = () => {
    const { title, description, selectedLabels } = this.state;
    const { dispatch, cardId, labels } = this.props;
    let newLabelId;

    if (!title.trim()) {
      return toast.error('Title cannot be empty', {
        position: toast.POSITION_TOP_RIGHT,
      });
    }

    if (!labels.labelId) {
      newLabelId = shortid.generate();
      dispatch(Labels.addLabel(newLabelId, selectedLabels));
    } else {
      dispatch(Labels.addLabel(labels.labelId, selectedLabels));
    }

    dispatch(Cards.updateCard(cardId, title, description, labels.labelId));

    return this.setState({ modalOpen: false });
  }

  onChangeHandler = (e, { name, value }) => this.setState({ [name]: value });

  deleteHandler = () => {
    const { dispatch, laneId, cardId } = this.props;

    dispatch(Cards.deleteCard(cardId));
    dispatch(Lanes.deleteCard(laneId, cardId));

    return this.setState({ modalOpen: false });
  }

  resetState = () => this.setState({ title: this.props.title, description: this.props.description || '' });

  closeModal = () => this.setState({ modalOpen: false, title: this.props.title, description: this.props.description || '' });

  openModal = () => this.setState({ modalOpen: true });

  handleSelection = (e, { value }) => {
    const selection = [];

    value.forEach((str) => {
      labelOptions.forEach((label) => {
        if (label.value === str) {
          selection.push(label);
        }
      });
    });

    return this.setState({ selectedLabels: selection });
  };

  handleSelectedLabels = () => {
    const { selectedLabels } = this.state;

    return selectedLabels !== null || undefined
      ? selectedLabels.map((label) => {
        return (
          <Button size="mini" basic color={label.value} key={label.value} compact>
            <Button.Content>
              <Icon name={label.icon}color={label.value} />
            </Button.Content>
          </Button>);
      })
      : null;
  }

  renderLabels = (label) => {

    return {
      key: label.value,
      icon: (<Icon name={label.icon} />),
      color: label.value,
    };
  }

  render() {
    const { modalOpen, description } = this.state;
    const { title } = this.props;

    return (
      <Modal
        trigger={
          <SemanticCard onClick={this.openModal}>
            <SemanticCard.Content >
              <SemanticCard.Header>
                { this.state.selectedLabels && this.handleSelectedLabels() }
              </SemanticCard.Header>
              <SemanticCard.Description>
                { title }
              </SemanticCard.Description>
            </SemanticCard.Content>
          </SemanticCard>
        }
        open={modalOpen}
        size="tiny"
        onClose={this.resetState}
      >
        <Modal.Header>
          <StyledTextArea
            name="title"
            value={this.state.title}
            autoHeight
            onChange={this.onChangeHandler}
          />
          <Dropdown
            fluid={false}
            placeholder="Labels"
            multiple
            options={labelOptions}
            onChange={this.handleSelection}
            renderLabel={this.renderLabels}
            value={this.state.selectedLabels.map(label => label.value)}
          />
        </Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>Description</Header>
            <StyledTextArea
              autoHeight
              name="description"
              placeholder="Add a more detailed description..."
              onChange={this.onChangeHandler}
              value={description}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button type="button" negative onClick={this.closeModal} icon="cancel" labelPosition="left" content="Cancel" floated="left" />
          <Button type="button" negative icon="trash" onClick={this.deleteHandler} labelPosition="right" content="Delete" />
          <Button type="button" positive icon="checkmark" labelPosition="right" onClick={this.onSaveHandler} content="Save" />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(state => ({
  labels: state.Labels,
}))(Card);

const StyledTextArea = styled(({ className, children, ...rest }) => (
  <TextArea className={className} {...rest}>
    {children}
  </TextArea>
))`
  width: 100%;
  color: ${colors.grey};
  box-shadow: -7px 10px 55px -19px rgba(0,0,0,0.75);
  border-radius: 5px;
  padding: 5px;
  border: 1px solid ${colors.lightGrey};
`;

