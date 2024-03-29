import FabricCanvasTool from './fabrictool'

class Pencil extends FabricCanvasTool {
    configureCanvas(props) {
        this._canvas.isDrawingMode = true;
        this._canvas.freeDrawingBrush.width = 5;
        this._canvas.freeDrawingBrush.color = props.pencilLineColor;
    }
}

export default Pencil;