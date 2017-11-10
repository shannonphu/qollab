import React, { Component } from 'react';
import { SketchField, Tools } from 'react-sketch';

class Canvas extends Component {
    constructor(params) {
        super(params);

        this._download = this._download.bind(this);
        this._onSketchChange = this._onSketchChange.bind(this);
    }

    state = {
        lineColor: 'black',
        lineWidth: 5,
        fillColor: '#68CCCA',
        backgroundColor: 'transparent',
        tool: Tools.Pencil,
        controlledSize: false,
        sketchWidth: 600,
        sketchHeight: 600,
    };

    componentDidMount() {
        /*eslint-disable no-console*/
        (function (console) {
            console.save = function (data, filename) {
                if (!data) {
                    console.error('Console.save: No data');
                    return;
                }
                if (!filename) filename = 'console.json';
                if (typeof data === 'object') {
                    data = JSON.stringify(data, undefined, 4)
                }
                var blob = new Blob([data], { type: 'text/json' }),
                    e = document.createEvent('MouseEvents'),
                    a = document.createElement('a');
                a.download = filename;
                a.href = window.URL.createObjectURL(blob);
                a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
                e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                a.dispatchEvent(e)
            }
        })(console);

        /*eslint-enable no-console*/
    }

    _download() {
        /*eslint-disable no-console*/
        console.save(JSON.stringify(this._sketch.toJSON()), 'canvas.json');
        /*eslint-enable no-console*/
    }

    _onSketchChange() {
    }

    render() {
        return (
            <SketchField
                name='sketch'
                className='canvas-area'
                ref={(c) => this._sketch = c}
                lineColor={this.state.lineColor}
                lineWidth={this.state.lineWidth}
                fillColor={ this.state.fillColor }
                backgroundColor={ this.state.backgroundColor }
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