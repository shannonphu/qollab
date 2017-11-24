import React, { Component } from 'react';
import SketchField from './react-sketch/SketchField';
import Tools from './react-sketch/tools';
import { connect } from 'react-redux';
import { ANNOTATION_STATE } from '../reducers/annotation';

/**
 * Canvas component, which acts like the blackboard of the classroom.
 * @class
 * @augments Component
 */
class Canvas extends Component {
    /**
     * @constructor
     * @param {PropTypes.Object} props 
     */
    constructor(props) {
        super(props);

        this._download = this._download.bind(this);
        this._onSketchChange = this._onSketchChange.bind(this);
        this._setCanvasFromJSON = this._setCanvasFromJSON.bind(this);
    }

    /**
     * state of the canvas, defining sizes, colors, drawing tools, etc.
     * @var
     */
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

    /**
     * Download the current Canvas
     */
    _download() {
        /*eslint-disable no-console*/
        console.save(JSON.stringify(this._canvas.toJSON()), 'canvas.json');
        /*eslint-enable no-console*/
    }

    /**
     * Responds to sketch change and update the change through socket
     */
    _onSketchChange() {
    }

    /**
     * Updates the canvas according to given JSON
     * @param {*} canvasJSON 
     */
    _setCanvasFromJSON(canvasJSON) {
    }

    /**
     * Renders the canvas
     */
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
                tool={this.props.annotationState === ANNOTATION_STATE.EDITING ? Tools.Rectangle : this.state.tool}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        annotationState: state.annotationReducer.annotationState
    }
}

export default connect(mapStateToProps, null)(Canvas);