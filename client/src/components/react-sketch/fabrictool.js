import uuidv1 from 'uuid/v1';

/**
 * "Abstract" like base class for a Canvas tool
 * @class
 */
class FabricCanvasTool {
    /**
     * @constructor
     * @param {Object} canvas 
     */
    constructor(canvas) {
        this._canvas = canvas;
    }

    /**
     * @function
     * @param {Object} props 
     */
    configureCanvas(props) {

    }

    /**
     * @function
     * @param {*} event 
     */
    doMouseUp(event) {

    }

    /**
     * @function
     * @param {*} event 
     */
    doMouseDown(event) {

    }

    /**
     * @function
     * @param {*} event 
     */
    doMouseMove(event) {

    }

    /**
     * @function
     * @param {*} event 
     */
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