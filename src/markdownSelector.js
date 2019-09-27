import React, { Component } from 'react';
import Selector from './selector.js'
import './markdownSelector.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

class MarkdownSelector extends Selector {
  createLines(){
    var split = this.props.input.split('\n');
    var arr = [];
    for(var i = 0; i < split.length; i++){
        let classes = "";
        if(this.props.down !== null && this.props.up !== null){
            let [smaller, bigger] = (this.props.down < this.props.up) ? [this.props.down, this.props.up] : [this.props.up, this.props.down];
            if(i >= smaller && i <= bigger){
                classes = "selected";
            }
        }
        let str = (split[i] === "") ? "\u00A0" : split[i];
        let item = <p className={classes} onMouseDown={this.handleDown(i)} onMouseUp={this.handleUp(i)} onMouseOver={this.handleOver(i)}>{str}</p>;
        arr.push(item);
    }
    return arr;
  }

  render() {
    return (
      <div className="App-MarkdownSelector">
          {this.createLines()}
      </div>
    );
  }
}

export default MarkdownSelector;
