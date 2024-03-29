/*eslint no-unused-vars: 0*/

import ReactDOM from 'react-dom';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import History from './history';
import Pencil from './pencil';
import Tool from './tools';
import * as realtimeActions from '../../actions/realtime';
import * as commentActions from '../../actions/comments';
import * as lectureActions from '../../actions/lecture';

const fabric = require('fabric').fabric;

/**
 * Sketch Tool based on FabricJS for React Applications
 */
class SketchField extends Component {

    static propTypes = {
        // the color of the line
        pencilLineColor: PropTypes.string,
        // The width of the line
        lineWidth: PropTypes.number,
        // the fill color of the shape when applicable
        fillColor: PropTypes.string,
        // the background color of the sketch
        backgroundColor: PropTypes.string,
        // the opacity of the object
        opacity: PropTypes.number,
        // number of undo/redo steps to maintain
        undoSteps: PropTypes.number,
        // The tool to use, can be pencil, rectangle, circle, brush;
        tool: PropTypes.string,
        // image format when calling toDataURL
        imageFormat: PropTypes.string,
        // Default initial data
        defaultData: PropTypes.object,
        // Type of initial data
        defaultDataType: PropTypes.oneOf(['json', 'url']),
        // Specify some width correction which will be applied on auto resize
        widthCorrection: PropTypes.number,
        // Specify some height correction which will be applied on auto resize
        heightCorrection: PropTypes.number
    };

    static defaultProps = {
        pencilLineColor: 'black',
        lineWidth: 10,
        fillColor: 'transparent',
        backgroundColor: 'transparent',
        opacity: 1.0,
        undoSteps: 25,
        tool: Tool.Pencil,
        defaultDataType: 'json',
        widthCorrection: 2,
        heightCorrection: 0
    };

    constructor(props, context) {
        super(props, context);
        // internal functions
        this._resize = this._resize.bind(this);
        this._initTools = this._initTools.bind(this);
        this._backgroundColor = this._backgroundColor.bind(this);
        // exposed
        this.zoom = this.zoom.bind(this);
        this.enableTouchScroll = this.enableTouchScroll.bind(this);
        this.disableTouchScroll = this.disableTouchScroll.bind(this);
        // events
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onMouseOut = this._onMouseOut.bind(this);
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
        this._onPathAdded = this._onPathAdded.bind(this);
        this._onRectMoving = this._onRectMoving.bind(this);
        this._onObjectRemoved = this._onObjectRemoved.bind(this);
        this._onObjectScaling = this._onObjectScaling.bind(this);
        this._onObjectModified = this._onObjectModified.bind(this);
        this._onObjectRotating = this._onObjectRotating.bind(this);

        // Link this canvas to this join code in the Redux store
        this.props.storeJoinCodeToRealtimeReducer(props.joinCode);
        this.props.storeJoinCodeToCommentsReducer(props.joinCode);
        // Get the canvas data that currently stored in MongoDB in case we entered a session mid-way
        // and there is data to sync with.
        axios.all([
          axios.get('http://localhost:3005/user/current/', {
            withCredentials: true
          }),
          axios.get('http://localhost:3005/lecture/' + props.joinCode)
        ])
          .then((response) => {
            let user = response[0].data;
            let lecture = response[1].data;
            this.fromJSON(lecture.canvas);
            this.props.storeLecture(lecture);
    
            let userID = user._id;
            let instructorID = lecture.instructor;
            if (userID !== instructorID && lecture.instructor) {
              this.props.deactivateCanvasDrawingMode();
              setTimeout(() => {
                this.props.freezeCanvasObjects();
              }, 100);
            }
          })
          .catch(error => console.log(error));
    }

    state = {
        parentWidth: 550,
        action: true
    };

    componentDidMount() {
        let {
            tool,
            undoSteps,
            defaultData,
            defaultDataType
        } = this.props;

        let canvas = this._fc = new fabric.Canvas(this._canvas.id);
        this.props.setInitialCanvas(canvas);
        this._initTools(canvas);

        let selectedTool = this._tools[tool];
        selectedTool.configureCanvas(this.props);
        this._selectedTool = selectedTool;

        // Control resize
        window.addEventListener('resize', this._resize, false);

        // Initialize History, with maximum number of undo steps
        this._history = new History(undoSteps);

        // Events binding
        canvas.on('path:created', this._onPathAdded);
        canvas.on('object:modified', this._onObjectModified);
        canvas.on('object:removed', this._onObjectRemoved);
        canvas.on('mouse:down', this._onMouseDown);
        canvas.on('mouse:move', this._onMouseMove);
        canvas.on('mouse:up', this._onMouseUp);
        canvas.on('object:moving', this._onRectMoving);
        canvas.on('object:scaling', this._onObjectScaling);
        canvas.on('object:rotating', this._onObjectRotating);

        this.disableTouchScroll();
        this._resize();

        // initialize canvas with default data
        if (defaultData) {
            if ('json' === defaultDataType) {
                this.fromJSON(defaultData);
            }
            if ('url' === defaultDataType) {
                this.fromDataURL(defaultData);
            }
        }
    }

    _initTools(fabricCanvas) {
        this._tools = {};
        this._tools[Tool.Pencil] = new Pencil(fabricCanvas);

        this._fc.defaultCursor = 'default';
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._resize);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.parentWidth !== prevState.parentWidth
            || this.props.width !== prevProps.width
            || this.props.height !== prevProps.height) {

            this._resize();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.tool !== nextProps.tool) {
            this._selectedTool = this._tools[nextProps.tool] || this._tools[Tool.Pencil];
        }
    }

    /**
     * Enable touch Scrolling on Canvas
     */
    enableTouchScroll() {
        let canvas = this._fc;
        if (canvas.allowTouchScrolling) return;
        canvas.allowTouchScrolling = true;
    }

    /**
     * Disable touch Scrolling on Canvas
     */
    disableTouchScroll() {
        let canvas = this._fc;
        if (canvas.allowTouchScrolling) {
            canvas.allowTouchScrolling = false;
        }
    }

    _onPathAdded(e) {
        if (!this.state.action) {
            this.setState({ action: true });
            return;
        }

        let obj = e;
        let state = JSON.stringify(obj);
        // object, previous state, current state
        this._history.keep([obj, state, state]);

        this.props.canvasUpdated(this.toJSON(), this.props.joinCode);
        this.props.unhighlightAllRects();
        axios.post('http://localhost:3005/canvas/set', {
          joinCode: this.props.joinCode,
          canvasJSON: JSON.stringify(this.toJSON())
        }, {
            withCredentials: true
          })
          .then(() => {
          })
          .catch((error) => {
            throw error;
          });
    
        if (this.props.onChange) {
          let onChange = this.props.onChange;
          setTimeout(() => {
            onChange();
          }, 10);
        }
    }

    _onObjectModified(e) {
        let obj = e.target;
        obj.version += 1;
        let prevState = JSON.stringify(obj.originalState);
        obj.saveState();
        let currState = JSON.stringify(obj.originalState);
        this._history.keep([obj, prevState, currState]);
    }

    _onRectMoving(e) {
        if (e.target.type !== "rect") {
            return;
        }
    }

    _onObjectScaling(e) {

    }

    _onObjectRotating(e) {

    }

    _onObjectRemoved(e) {
        let obj = e.target;
        obj.version = 0;
    }

    _onMouseDown(e) {
        this._selectedTool.doMouseDown(e);
    }

    _onMouseMove(e) {
        this._selectedTool.doMouseMove(e);
    }

    _onMouseUp(e) {
        this._selectedTool.doMouseUp(e);
    }

    _onMouseOut(e) {
        this._selectedTool.doMouseOut(e);
    }

    /**
     * Track the resize of the window and update our state
     *
     * @param e the resize event
     * @private
     */
    _resize(e) {
        if (e) e.preventDefault();
        let { widthCorrection, heightCorrection } = this.props;
        let canvas = this._fc;
        let domNode = ReactDOM.findDOMNode(this);
        let { offsetWidth, clientHeight } = domNode;
        let prevWidth = canvas.getWidth();
        let prevHeight = canvas.getHeight();
        let wfactor = ((offsetWidth - widthCorrection) / prevWidth).toFixed(2);
        let hfactor = ((clientHeight - heightCorrection) / prevHeight).toFixed(2);
        canvas.setWidth(offsetWidth - widthCorrection);
        canvas.setHeight(clientHeight - heightCorrection);
        if (canvas.backgroundImage) {
            // Need to scale background images as well
            let bi = canvas.backgroundImage;
            bi.width *= wfactor;
            bi.height *= hfactor;
        }
        let objects = canvas.getObjects();
        for (let i in objects) {
            let obj = objects[i];
            let scaleX = obj.scaleX;
            let scaleY = obj.scaleY;
            let left = obj.left;
            let top = obj.top;
            let tempScaleX = scaleX * wfactor;
            let tempScaleY = scaleY * hfactor;
            let tempLeft = left * wfactor;
            let tempTop = top * hfactor;
            obj.scaleX = tempScaleX;
            obj.scaleY = tempScaleY;
            obj.left = tempLeft;
            obj.top = tempTop;
            obj.setCoords();
        }
        this.setState({
            parentWidth: offsetWidth
        });
        canvas.renderAll();
        canvas.calcOffset();
    }

    /**
     * Sets the background color for this sketch
     * @param color in rgba or hex format
     */
    _backgroundColor(color) {
        if (!color) return;
        let canvas = this._fc;
        canvas.setBackgroundColor(color, () => canvas.renderAll());
    }


    /**
     * Zoom the drawing by the factor specified
     *
     * The zoom factor is a percentage with regards the original, for example if factor is set to 2
     * it will double the size whereas if it is set to 0.5 it will half the size
     *
     * @param factor the zoom factor
     */
    zoom(factor) {
        let canvas = this._fc;
        let objects = canvas.getObjects();
        for (let i in objects) {
            objects[i].scaleX *= factor;
            objects[i].scaleY *= factor;
            objects[i].left *= factor;
            objects[i].top *= factor;
            objects[i].setCoords();
        }
        canvas.renderAll();
        canvas.calcOffset();
    }


    /**
     * Perform an undo operation on canvas, if it cannot undo it will leave the canvas intact
     */
    undo() {
        let history = this._history;
        let [obj, prevState, currState] = history.getCurrent();
        history.undo();
        if (obj.version === 1) {
            obj.remove();
        } else {
            obj.setOptions(JSON.parse(prevState));
            obj.setCoords();
            obj.version -= 1;
            this._fc.renderAll();
        }
    }

    /**
     * Perform a redo operation on canvas, if it cannot redo it will leave the canvas intact
     */
    redo() {
        let history = this._history;
        if (history.canRedo()) {
            let canvas = this._fc;
            //noinspection Eslint
            let [obj, prevState, currState] = history.redo();
            if (obj.version === 0) {
                this.setState({ action: false }, () => {
                    canvas.add(obj);
                    obj.version = 1;
                });
            } else {
                obj.version += 1;
                obj.setOptions(JSON.parse(currState));
            }
            obj.setCoords();
            canvas.renderAll();
        }
    }

    /**
     * Delegation method to check if we can perform an undo Operation, useful to disable/enable possible buttons
     *
     * @returns {*} true if we can undo otherwise false
     */
    canUndo() {
        return this._history.canUndo();
    }

    /**
     * Delegation method to check if we can perform a redo Operation, useful to disable/enable possible buttons
     *
     * @returns {*} true if we can redo otherwise false
     */
    canRedo() {
        return this._history.canRedo();
    }

    /**
     * Exports canvas element to a dataurl image. Note that when multiplier is used, cropping is scaled appropriately
     *
     * Available Options are
     * <table style="width:100%">
     *
     * <tr><td><b>Name</b></td><td><b>Type</b></td><td><b>Argument</b></td><td><b>Default</b></td><td><b>Description</b></td></tr>
     * <tr><td>format</td> <td>String</td> <td><optional></td><td>png</td><td>The format of the output image. Either "jpeg" or "png"</td></tr>
     * <tr><td>quality</td><td>Number</td><td><optional></td><td>1</td><td>Quality level (0..1). Only used for jpeg.</td></tr>
     * <tr><td>multiplier</td><td>Number</td><td><optional></td><td>1</td><td>Multiplier to scale by</td></tr>
     * <tr><td>left</td><td>Number</td><td><optional></td><td></td><td>Cropping left offset. Introduced in v1.2.14</td></tr>
     * <tr><td>top</td><td>Number</td><td><optional></td><td></td><td>Cropping top offset. Introduced in v1.2.14</td></tr>
     * <tr><td>width</td><td>Number</td><td><optional></td><td></td><td>Cropping width. Introduced in v1.2.14</td></tr>
     * <tr><td>height</td><td>Number</td><td><optional></td><td></td><td>Cropping height. Introduced in v1.2.14</td></tr>
     *
     * </table>
     *
     * @returns {String} URL containing a representation of the object in the format specified by options.format
     */
    toDataURL(options) {
        return this._fc.toDataURL(options);
    }

    /**
     * Returns JSON representation of canvas
     *
     * @param propertiesToInclude Array <optional> Any properties that you might want to additionally include in the output
     * @returns {string} JSON string
     */
    toJSON(propertiesToInclude) {
        return this._fc.toJSON(propertiesToInclude);
    }

    /**
     * Populates canvas with data from the specified JSON.
     *
     * JSON format must conform to the one of fabric.Canvas#toDatalessJSON
     *
     * @param json JSON string or object
     */
    fromJSON(json) {
        if (!json) return;
        let canvas = this._fc;
        setTimeout(() => {
            canvas.loadFromJSON(json);
        }, 100);
    }

    /**
     * Clear the content of the canvas, this will also clear history but will return the canvas content as JSON to be
     * used as needed in order to undo the clear if possible
     *
     * @param propertiesToInclude Array <optional> Any properties that you might want to additionally include in the output
     * @returns {string} JSON string of the canvas just cleared
     */
    clear(propertiesToInclude) {
        let discarded = this.toJSON(propertiesToInclude);
        this._fc.clear();
        this._history.clear();
        return discarded;
    }

    setBackgroundFromDataUrl(dataUrl, options = {}) {
        let canvas = this._fc;
        if (options.stretched) {
            delete options.stretched;
            Object.assign(options, {
                width: canvas.width,
                height: canvas.height
            })
        }
        if (options.stretchedX) {
            delete options.stretchedX;
            Object.assign(options, {
                width: canvas.width
            })
        }
        if (options.stretchedY) {
            delete options.stretchedY;
            Object.assign(options, {
                height: canvas.height
            })
        }
        let img = new Image();
        img.onload = () => canvas.setBackgroundImage(new fabric.Image(img), () => canvas.renderAll(), options);
        img.src = dataUrl;
    }

    render() {
        let {
            className,
            disabled,
            style,
            onChange,
            width,
            height,
            ...other
        } = this.props;

        let canvasDivStyle = Object.assign({}, style ? style : {}, width ? { width: width } : {}, height ? { height: height } : { height: 512 });

        return (
            <div
                className={className}
                style={canvasDivStyle}>
                <canvas
                    id='123'
                    ref={(c) => this._canvas = c}>
                    Sorry, Canvas HTML5 element is not supported by your browser :(
                </canvas>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        activeAnnotation: state.realtimeReducer.activeAnnotation,
        canvasJSON: state.realtimeReducer.canvasJSON,
        updatedJoinCode: state.realtimeReducer.joinCode,
        comments: state.commentsReducer.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deactivateCanvasDrawingMode: () => dispatch(realtimeActions.deactivateCanvasDrawingMode()),
        freezeCanvasObjects: () => dispatch(realtimeActions.freezeCanvasObjects()),
        storeJoinCodeToRealtimeReducer: joinCode => dispatch(realtimeActions.storeJoinCode(joinCode)),
        storeJoinCodeToCommentsReducer: joinCode => dispatch(commentActions.storeJoinCode(joinCode)),
        setInitialCanvas: canvas => dispatch(realtimeActions.setInitialCanvas(canvas)),
        unhighlightAllRects: () => dispatch(realtimeActions.unhighlightAllRects()),
        storeLecture: (lecture) => dispatch(lectureActions.storeLecture(lecture)),
        canvasUpdated: (canvasJSON, joinCode) => dispatch({
            type: "socket/CANVAS_UPDATED", canvasJSON: {
                data: canvasJSON,
                joinCode: joinCode
            }
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SketchField);