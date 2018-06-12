import React from 'react';

function WithClickOutside(Component) {
  class Wrapper extends React.Component {
    static defaultProps = {
      fetchClickOutside: () => {}
    };

    state = {
      clickOutside: false
    };

    componentDidMount() {
      document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside = (e) => {
      if (!this.containerRef || !this.containerRef.contains(e.target)) {
        return this.setState({ clickOutside: true }, () =>
          this.props.fetchClickOutside(this.state.clickOutside)
        );
      }

      return this.setState({ clickOutside: false }, () =>
        this.props.fetchClickOutside(this.state.clickOutside, true)
      );
    };

    render() {
      return (
        <div ref={node => (this.containerRef = node)}>
          <Component clickOutside={this.state.clickOutside} {...this.props} />
        </div>
      );
    }
  }

  Wrapper.displayName = `WithClickOutside(${Component.displayName ||
    Component.name})`;

  return Wrapper;
}

export default WithClickOutside;
