import uuidv1 from 'uuid/v1';

/**
 * "Abstract" like base class for a Canvas tool
 */
class FabricCanvasTool {
    /**
     * @constructor
     * @param {Canvas} canvas 
     */
    constructor(canvas) {
        this._canvas = canvas;
    }

    configureCanvas(props) {

    }

    doMouseUp(event) {

    }

    doMouseDown(event) {

    }

    doMouseMove(event) {

    }

    doMouseOut(event) {

    }

    addInstance(event) {

    }

    removeInstance(event) {

    }

    randomID() {
        return uuidv1();
    }
}

export default FabricCanvasTool;