import React, { Component } from 'react';
import SketchField from './react-sketch/SketchField';
import Tools from './react-sketch/tools';

class Canvas extends Component {
    constructor(props) {
        super(props);
        this._onSketchChange = this._onSketchChange.bind(this);
    }

    state = {
        // Canvas Styles
        pencilLineColor: 'black',
        lineWidth: 5,
        fillColor: 'rgba(104, 204, 202, 0.3)',
        backgroundColor: 'transparent',
        tool: Tools.Pencil,
        controlledSize: false,
        sketchWidth: 850,
        sketchHeight: 600,
    };

    _onSketchChange() {
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
                tool={this.state.tool}
            />
        )
    }
}

export default Canvas;