import React, { Component } from 'react';
import { SketchField, Tools } from 'react-sketch';

class CanvasContainer extends Component {
    constructor(params) {
        super(params);

        this._download = this._download.bind(this);
        this._onSketchChange = this._onSketchChange.bind(this);
    }

    state = {
        lineColor: 'black',
        lineWidth: 10,
        fillColor: '#68CCCA',
        backgroundColor: 'transparent',
        shadowWidth: 0,
        shadowOffset: 0,
        tool: Tools.Pencil,
        fillWithColor: false,
        fillWithBackgroundColor: false,
        drawings: [],
        canUndo: false,
        canRedo: false,
        controlledSize: false,
        sketchWidth: 600,
        sketchHeight: 600,
        stretched: true,
        stretchedX: false,
        stretchedY: false,
        originX: 'left',
        originY: 'top'
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

        console.save(this._sketch.toDataURL(), 'toDataURL.txt');
        console.save(JSON.stringify(this._sketch.toJSON()), 'toDataJSON.txt');

        /*eslint-enable no-console*/

        let { imgDown } = this.refs;
        let event = new Event('click', {});

        imgDown.href = this._sketch.toDataURL();
        imgDown.download = 'toPNG.png';
        imgDown.dispatchEvent(event);
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
                fillColor={this.state.fillWithColor ? this.state.fillColor : 'transparent'}
                backgroundColor={this.state.fillWithBackgroundColor ? this.state.backgroundColor : 'transparent'}
                width={this.state.controlledSize ? this.state.sketchWidth : null}
                height={this.state.controlledSize ? this.state.sketchHeight : null}
                defaultDataType="json"
                onChange={this._onSketchChange}
                tool={this.state.tool}
            />
        )
    }
}

export default CanvasContainer