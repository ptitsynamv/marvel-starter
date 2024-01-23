import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  //   static getDerivedStateFromError(error) {
  //     return { error: true };
  //   }

  componentDidCatch(error, errorInfo) {
    this.setState({ error: true });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error) {
      return <ErrorMessage />;
    }

    return children;
  }
}

export default ErrorBoundary;
