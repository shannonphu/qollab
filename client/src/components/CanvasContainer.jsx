import React, {Component} from 'react';
import { Stage, Layer } from "react-konva";
import DrawingCanvas from "./DrawingCanvas";

class CanvasContainer extends Component {
    constructor (props) {
        super(props)
        this.state = { width: 700, height: 700 };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    render () {
        console.log(this.refs.stage);
        return (
            <Stage ref="stage" width={this.state.width} height={this.state.height}>
                <Layer>
                    <DrawingCanvas width={this.state.width} height={this.state.height} />
                </Layer>
            </Stage>
        )
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
}

export default CanvasContainer