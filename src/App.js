import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import PdfSelector from './pdfSelector.js';
import MarkdownSelector from './markdownSelector.js';
import SlidesView from './slidesView.js';
import ReactDom from 'react-dom';
import ReactFileReader from 'react-file-reader';

class App extends Component {
  state = {
    relations: [],
    markdownText: "",
    pdfDownSelected: null,
    pdfUpSelected: null,
    markdownDownSelected: null,
    markdownUpSelected: null,
    pdfFile: null
  }
 
  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }

  textAreaInput = (e) => {
    var text = e.target.value;
    this.setState((state) => ({
      markdownText: text
    }));
  }

  orderSmallToLarge(a, b){
    return (a > b) ? [b, a] : [a, b];
  }

  relateSelected = () => {
    var rel = {
      pdfSelection: this.orderSmallToLarge(this.state.pdfDownSelected, this.state.pdfUpSelected),
      markdownSelection: this.orderSmallToLarge(this.state.markdownDownSelected, this.state.markdownUpSelected)
    };

    if(this.state.relations.find((e) => {
        for(var i in e)
          if(rel[i])
            for(var j in e[i])
              if(rel[i][j] && e[i][j] !== rel[i][j])
                return false;
        return true;
      }) === undefined){
      this.setState( (prevState) => ({
        relations: [...prevState.relations, rel]
      }));
    }
  }

  oldRelationSelection(down, up, str_relType){
    let ord = this.orderSmallToLarge(down, up);

    for(var rel of this.state.relations){
      var sel = rel[str_relType];
      // s0 - o0 - o1 - s1
      if(sel[0] <= ord[0] && ord[1] <= sel[1]){ // Selection within old relation
        [down, up] = sel;
      }// o0 - s0 - s1 - o1
      else if(ord[0] <= sel[0] && sel[1] <= ord[1]){ // Selection engulfs old relation
        up = (down > sel[1]) ? Math.min(sel[0], up) : Math.max(sel[1], up);
      }// s0 - o0 - s1
      else if(sel[0] <= ord[0] && ord[0] <= sel[1]){ // Old relation range overlap on left of selection
        up = sel[0];
      }// s0 - o1 - s1
      else if(sel[0] <= ord[1] && ord[1] <= sel[1]){ // Old relation range overlap on right of selection
        up = sel[1];
      }
    }
    return {down: down, up: up};
  }

  onPdfSelectionChange = (down, up) => {
    let sel = this.oldRelationSelection(down, up, "pdfSelection");

    this.setState( (prevState) => ({
      pdfDownSelected: sel.down,
      pdfUpSelected: sel.up
    }));
  }

  onMarkdownSelectionChange = (down, up) => {
    let sel = this.oldRelationSelection(down, up, "markdownSelection");

    this.setState( (prevState) => ({
      markdownDownSelected: sel.down,
      markdownUpSelected: sel.up
    }));
  }

  render() {
    return (
      <div className="App">
        <ReactFileReader fileTypes={[".pdf"]} multipleFiles={false} handleFiles={files => {
            if(files[0]){
              this.setState((state => ({
                pdfFile: files[0]
              })));
            }
        }}>
          <button>Upload PDF</button>
        </ReactFileReader>
        <button onClick={this.relateSelected}>Henlo</button>
        <textarea onInput={this.textAreaInput}></textarea>
        <img src={logo} className="App-logo" alt="logo" />
        <MarkdownSelector input={this.state.markdownText} onSelection={this.onMarkdownSelectionChange} down={this.state.markdownDownSelected} up={this.state.markdownUpSelected}/>
        <SlidesView markdown={this.state.markdownText} relations={this.state.relations} file={this.state.pdfFile}/>
        <PdfSelector
            file={this.state.pdfFile}
            scale={0.25}
            onLoadSuccess={this.onDocumentLoad}
            onSelection={this.onPdfSelectionChange}
            down={this.state.pdfDownSelected}
            up={this.state.pdfUpSelected}
          >
        </PdfSelector>
      </div>
    );
  }
}

export default App;
