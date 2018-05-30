import React, { Component } from 'react';
import { Modal, Header, Card as SemanticCard, Button, TextArea, Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { colors } from 'utils/colors';
import { Cards, Lanes } from 'actions';
import Comment from 'components/Comment/Comment';

const labelOptions = [
  { color: 'green', value: 'UI', text: 'UI' },
  { color: 'blue', value: 'Development', text: 'Development' },
  { color: 'orange', value: 'Bug', text: 'Bug' },
  { color: 'red', value: 'API', text: 'API' },
  { color: 'pink', value: 'Feature', text: 'Feature' },
  { color: 'olive', value: 'QA', text: 'QA' },
];

class Card extends Component {
  state = {
    title: '',
    description: '',
    modalOpen: false,
    labels: [],
    ...this.props,
  }

  onSaveHandler = () => {
    const { title, description, labels } = this.state;
    const { dispatch, cardId } = this.props;

    if (!title.trim()) {
      return toast.error('Title cannot be empty', {
        position: toast.POSITION_TOP_RIGHT,
      });
    }

    dispatch(Cards.addLabel(cardId, labels));
    dispatch(Cards.updateCard(cardId, title.trim(), description));

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

  closeModal = () => this.setState({ modalOpen: false, title: this.props.title, description: this.props.description || '', labels: this.props.labels });

  openModal = () => this.setState({ modalOpen: true });

  handleSelection = (e, { value }) => this.setState({ labels: value });

  handleLabels = () => {
    const { labels } = this.props;
    const filtered = [];

    labels.forEach((label) => {
      labelOptions.forEach((option) => {
        if (option.value === label) {
          filtered.push(option);
        }
      });
    });

    return labels.length ? filtered.map((option) => {
      return (
        <Button size="mini" basic key={option.value} color={option.color} compact>
          {option.text}
        </Button>
      );
    }) : null;
  }

  renderLabels = label => ({
    key: label.value,
    content: label.value,
    color: label.color,
  })

  render() {
    const { modalOpen, description } = this.state;
    const { title, cards, cardId } = this.props;

    return (
      <Modal
        trigger={
          <StyledCard onClick={this.openModal} as="div">
            <SemanticCard.Content >
              <SemanticCard.Header>
                { this.handleLabels() }
              </SemanticCard.Header>
              <SemanticCard.Description as="pre">
                { title }
              </SemanticCard.Description>
            </SemanticCard.Content>
          </StyledCard>
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
            value={this.state.labels}
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
        <Modal.Content scrolling>
          <Comment
            {...this.props}
            comments={cards[cardId].comments}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            type="button"
            onClick={this.closeModal}
            icon="cancel"
            labelPosition="right"
            content="Cancel"
            floated="left"
          />
          <Button
            type="button"
            negative
            icon="trash"
            onClick={this.deleteHandler}
            labelPosition="right"
            content="Delete"
          />
          <Button
            type="button"
            positive
            icon="checkmark"
            labelPosition="right"
            onClick={this.onSaveHandler}
            content="Save"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(state => ({
  cards: state.Cards
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

const StyledCard = styled(SemanticCard)`
  &.ui.card {
    width: initial;
    margin: 1rem !important;

    &:hover {
      transform: translateY(-5px);
      background-color: ${colors.swimLane};
    }
  }
`;

