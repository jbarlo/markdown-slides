import React, { Component } from 'react';
import './slideCloseup.css';
import { Document, Page } from 'react-pdf/dist/entry.webpack';

class SlideCloseup extends Component {
    state = {
        zoomed: false,
        originalScale: this.props.scale,
        scale: this.props.scale,
        renderText: false,
        renderAnnotations: false
    }

    zoom = () => {
        this.setState((prevState) => ({
            zoomed: !(prevState.zoomed),
            scale: (!prevState.zoomed) ? 1 : prevState.originalScale,
            renderText: (!prevState.zoomed),
            renderAnnotations: (!prevState.zoomed)
        }));
    }

    render() {
        let classes = "";
        if(this.state.zoomed){
            classes = 'big';
        }
        return (
            <div className={'slideCloseupDiv ' + classes}>
                <Document
                    file={this.props.file}
                >
                    <Page
                        renderTextLayer={this.state.renderText}
                        renderAnnotations={this.state.renderAnnotations}
                        /* scale={this.state.scale} */
                        pageNumber={this.props.pageNumber}
                        onClick={this.zoom}
                    />
                </Document>
            </div>
        );
      }
}

export default SlideCloseup;