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
        this._canvas.freeDrawingBrush.width = props.lineWidth;
        this._canvas.freeDrawingBrush.color = props.lineColor;
    }
}

export default Pencil;