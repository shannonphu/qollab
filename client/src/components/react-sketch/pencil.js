import FabricCanvasTool from './fabrictool'
/**
 * @class
 * @augments FabricCanvasTool
 */
class Pencil extends FabricCanvasTool {

    /**
     * @param {Object} props 
     */
    configureCanvas(props) {
        this._canvas.isDrawingMode = true;
        this._canvas.freeDrawingBrush.width = 5;
        this._canvas.freeDrawingBrush.color = props.pencilLineColor;
    }
}

export default Pencil;