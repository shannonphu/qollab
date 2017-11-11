import React, { Component } from 'react';
import SketchField from './react-sketch/SketchField';
import Tools from './react-sketch/tools';
import io from 'socket.io-client';

let socket;

class Canvas extends Component {
    constructor(params) {
        super(params);

        this._download = this._download.bind(this);
        this._onSketchChange = this._onSketchChange.bind(this);
        this._setCanvasFromJSON = this._setCanvasFromJSON.bind(this);

        socket = io.connect('http://localhost:3003', { query: 'lectureCode=' + this.state.currentJoinCode });

        socket.on("connect", () => {
            console.log("client connected");
        });

        socket.on('canvas:update', (canvasJSON) => this._setCanvasFromJSON(canvasJSON));
    }

    state = {
        currentJoinCode: this.props.match.params.joinCode,
        lineColor: 'black',
        lineWidth: 5,
        fillColor: '#68CCCA',
        backgroundColor: 'transparent',
        tool: Tools.Pencil,
        controlledSize: false,
        sketchWidth: 600,
        sketchHeight: 600,
    };

    _download() {
        /*eslint-disable no-console*/
        console.save(JSON.stringify(this._sketch.toJSON()), 'canvas.json');
        /*eslint-enable no-console*/
    }

    _onSketchChange() {
        let joinCode = this.props.match.params.joinCode;
        let canvasObj = {
            "data": this._sketch.toJSON(),
            "joinCode": joinCode
        }

        // console.log("sketch changed");
        socket.emit('path:drawn', JSON.stringify(canvasObj));
    }

    _setCanvasFromJSON(canvasJSON) {
        let parsedCanvasJSON = JSON.parse(canvasJSON);

        let updatedLectureJoinCode = parsedCanvasJSON['joinCode'];
        if (updatedLectureJoinCode === this.state.currentJoinCode) {
            let canvasData = parsedCanvasJSON['data'];
            this._sketch.fromJSON(canvasData);
        }
    }

    render() {
        return (
            <SketchField
                name='sketch'
                className='canvas-area'
                ref={(c) => this._sketch = c}
                lineColor={this.state.lineColor}
                lineWidth={this.state.lineWidth}
                fillColor={this.state.fillColor}
                backgroundColor={this.state.backgroundColor}
                width={this.state.controlledSize ? this.state.sketchWidth : null}
                height={this.state.controlledSize ? this.state.sketchHeight : null}
                defaultDataType="json"
                onChange={this._onSketchChange}
                tool={this.state.tool}
            />
        )
    }
}

export default Canvas