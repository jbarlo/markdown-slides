import React, { Component } from 'react';
import './slidesView.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import ReactMarkdown from 'react-markdown';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import SlideCloseup from './slideCloseup.js'


class SlidesView extends Component {
  state = {}

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {
    let strs = [];
    for(var rel of this.props.relations){
        if(rel.markdownSelection && rel.pdfSelection){
          let pageArr = [];
          for(var i = rel.pdfSelection[0]; i <= rel.pdfSelection[1]; i++){
            pageArr.push(
              <SlideCloseup
                file={this.props.file}
                pageNumber={i}
                scale={.3}>
              </SlideCloseup>
            );
          }
          strs.push(
              <div>
                <ReactMarkdown source={this.props.markdown.split('\n')
                    .slice(rel.markdownSelection[0], rel.markdownSelection[1] + 1).join('\n')} />
                  {pageArr}
              </div>
          );
        }
    }

    return (
      <div className="App-SlidesView">
        {strs}
      </div>
    );
  }
}

export default SlidesView;
