import React, { Component } from 'react';

class Selector extends Component {
    constructor() {
        if( new.target === Selector){
            throw new TypeError("Selector is Abstract. Cannot construct instances directly");
        }
        super();
        this.state = {
            mouseDown: false
        }
    }

    handleDown = (i) => () => {
    this.props.onSelection(i, i);
    this.setState( (prevState) => ({
        mouseDown: true
    }));
    }

    handleUp = (i) => () => {
    this.props.onSelection(this.props.down, i);
    this.setState( (prevState) => ({
        mouseDown: false
    }));
    }

    handleOver = (i) => () => {
    if(this.state.mouseDown){
        this.props.onSelection(this.props.down, i);
    }
    }
}

export default Selector;