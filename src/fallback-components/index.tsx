import React, { ReactNode, ErrorInfo } from 'react';

interface IErrorBoundaryProps {
    children: ReactNode;
    FallbackUI: React.ComponentType<{ error: Error }>; // FallbackUI component receives the error as a prop
}

interface IErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
    constructor(props: IErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error): IErrorBoundaryState {
        console.log('findError')
        return {
            hasError: true,
            error: error,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // You can log the error or send it to an error reporting service here
        console.error('error, errorInfo');
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            const FallbackComponent = this.props.FallbackUI;
            return <FallbackComponent error={this.state.error as Error} />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
