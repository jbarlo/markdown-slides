import React, { Component } from 'react';
import Selector from './selector.js'
import './pdfSelector.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Document, Page } from 'react-pdf/dist/entry.webpack';

class PdfSelector extends Selector {
  onDocumentLoad = ({ numPages }) => {
    this.setState({numPages});
  }

  createPages(){
    let arr = [];
    for(let i = 1; i < this.state.numPages; i++){
      let classes = "App-pdfSelector";
      if(this.props.down !== null && this.props.up !== null){
        let smaller = (this.props.down < this.props.up) ? this.props.down : this.props.up;
        let bigger = (smaller === this.props.up) ? this.props.down : this.props.up;
        if(i >= smaller && i <= bigger){
            classes += " selected";
        }
    }
        let page = 
          <Page
            className={classes}
            renderAnnotations={false}
            renderTextLayer={false}
            scale={this.props.scale}
            pageNumber={i}
            onMouseDown={this.handleDown(i)}
            onMouseUp={this.handleUp(i)}
            onMouseOver={this.handleOver(i)}
          />;

        arr.push(page);
    }
    return arr;
  }

  render() {
    return (
      <div className="App-PdfSelector">
        <Document
            file={this.props.file}
            onLoadSuccess={this.onDocumentLoad}
        >
          {this.createPages()}
        </Document>
      </div>
    );
  }
}

export default PdfSelector;
