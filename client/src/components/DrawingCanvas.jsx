import React, { Component } from 'react';
import { render } from "react-dom";
import { Rect, Image, Group } from "react-konva";

class DrawingCanvas extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isDrawing: false,
            mode: "brush"
        };
    }

    componentDidMount() {
        const canvas = document.createElement("canvas");
        canvas.width = this.props.width;
        canvas.height = this.props.height;
        const context = canvas.getContext("2d");

        this.setState({ canvas, context });
    }

    handleMouseDown = () => {
        console.log("mousedown");
        this.setState({ isDrawing: true });

        // TODO: improve
        const stage = this.image.parent.parent;
        this.lastPointerPosition = stage.getPointerPosition();
    };

    handleMouseUp = () => {
        console.log("mouseup");
        this.setState({ isDrawing: false });
    };

    handleMouseMove = () => {
        const { context, isDrawing, mode } = this.state;

        if (isDrawing) {
            // TODO: Don't always get a new context
            context.strokeStyle = "#df4b26";
            context.lineJoin = "round";
            context.lineWidth = 5;

            if (mode === "brush") {
                context.globalCompositeOperation = "source-over";
            } else if (mode === "eraser") {
                context.globalCompositeOperation = "destination-out";
            }

            context.beginPath();

            var localPos = {
                x: this.lastPointerPosition.x - this.image.x(),
                y: this.lastPointerPosition.y - this.image.y()
            };
            context.moveTo(localPos.x, localPos.y);

            // TODO: improve
            const stage = this.image.parent.parent;

            var pos = stage.getPointerPosition();
            localPos = {
                x: pos.x - this.image.x(),
                y: pos.y - this.image.y()
            };
            context.lineTo(localPos.x, localPos.y);
            context.closePath();
            context.stroke();
            this.lastPointerPosition = pos;
            this.image.getLayer().draw();
        }
    };

    render() {
        const { canvas } = this.state;

        return (
            <Image
                image={canvas}
                ref={node => (this.image = node)}
                width={this.props.width}
                height={this.props.height}
                stroke="black"
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseMove={this.handleMouseMove}
            />
        );
    }
}

export default DrawingCanvas