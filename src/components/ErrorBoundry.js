import React from "react";

class ErrorBoundry extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    render() {
        if(this.state.hasError) {
            return <span className='flex w-full h-screen justify-center items-center text-[5rem] text-white bg-red-400 p-4'>Your app crashed 💥</span>
        }

        return this.props.children;
    }
};

export default ErrorBoundry;