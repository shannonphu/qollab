import React, { Component } from 'react';
import SketchField from './react-sketch/SketchField';
import Tools from './react-sketch/tools';
import io from 'socket.io-client';

let socket;

class Canvas extends Component {
    constructor(props) {
        super(props);

        this._download = this._download.bind(this);
        this._onSketchChange = this._onSketchChange.bind(this);
        this._setCanvasFromJSON = this._setCanvasFromJSON.bind(this);

        socket = io.connect('http://localhost:3003', { query: 'lectureCode=' + this.props.joinCode });

        socket.on("connect", () => {
            console.log("client connected");
        });

        socket.on('canvas:update', (canvasJSON) => this._setCanvasFromJSON(canvasJSON));
    }

    state = {
        // Canvas Styles
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
        console.save(JSON.stringify(this._canvas.toJSON()), 'canvas.json');
        /*eslint-enable no-console*/
    }

    _onSketchChange() {
        let canvasObj = {
            "data": this._canvas.toJSON(),
            "joinCode": this.props.joinCode
        }

        socket.emit('path:drawn', JSON.stringify(canvasObj));
    }

    _setCanvasFromJSON(canvasJSON) {
        let parsedCanvasJSON = JSON.parse(canvasJSON);

        let updatedLectureJoinCode = parsedCanvasJSON['joinCode'];
        if (updatedLectureJoinCode === this.props.joinCode) {
            let canvasData = parsedCanvasJSON['data'];
            this._canvas.fromJSON(canvasData);
        }
    }

    render() {
        return (
            <SketchField
                name='sketch'
                className='canvas-area'
                ref={(c) => this._canvas = c}
                lineColor={this.state.lineColor}
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

export default Canvas