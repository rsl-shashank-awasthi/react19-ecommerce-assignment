import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-box">
          <h3>Unable to Load Products</h3>
          <p>{this.state.error?.message || 'An unexpected error occurred.'}</p>
          <button className="btn-primary" onClick={this.handleReset}>
            Retry Loading
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}