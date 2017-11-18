import React, { Component } from 'react';
import SketchField from './react-sketch/SketchField';
import Tools from './react-sketch/tools';
import { connect } from 'react-redux';


class Canvas extends Component {
    constructor(props) {
        super(props);

        this._download = this._download.bind(this);
        this._onSketchChange = this._onSketchChange.bind(this);
        this._setCanvasFromJSON = this._setCanvasFromJSON.bind(this);
    }

    state = {
        // Canvas Styles
        pencilLineColor: 'black',
        lineWidth: 5,
        fillColor: 'rgba(104, 204, 202, 0.3)',
        backgroundColor: 'transparent',
        tool: Tools.Pencil,
        controlledSize: false,
        sketchWidth: 600,
        sketchHeight: 600,
    };

    _download() {
        /*eslint-disable no-console*/
        console.save(JSON.stringify(this._canvas.toJSON()), 'canvas.json');
        /*eslint-enable no-console*/
    }

    _onSketchChange() {
    }

    _setCanvasFromJSON(canvasJSON) {
    }

    render() {
        return (
            <SketchField
                name='sketch'
                className='canvas-area z-depth-3'
                joinCode={this.props.joinCode}
                ref={(c) => this._canvas = c}
                pencilLineColor={this.state.pencilLineColor}
                lineWidth={this.state.lineWidth}
                fillColor={this.state.fillColor}
                backgroundColor={this.state.backgroundColor}
                width={this.state.sketchWidth}
                height={this.state.sketchHeight}
                defaultDataType="json"
                onChange={this._onSketchChange}
                tool={this.props.addAnnotationActive ? Tools.Rectangle : this.state.tool}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        addAnnotationActive: state.annotationReducer.addAnnotationActive
    }
}

export default connect(mapStateToProps, null)(Canvas);