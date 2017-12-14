import uuidv1 from 'uuid/v1';
const fabric = require('fabric').fabric;
const HIGHLIGHTED_ANNOTATION_FILL_COLOR = 'rgba(178, 223, 219, 0.5)';
const UNHIGHLIGHTED_ANNOTATION_FILL_COLOR = 'rgba(224, 242, 241, 0.3)';
const HIGHLIGHTED_ANNOTATION_STROKE_WIDTH = 2;
const UNHIGHLIGHTED_ANNOTATION_STROKE_WIDTH = 1;
const ANNOTATION_STROKE_COLOR = '#80cbc4';

var RealtimeReducer = (state = {
    lectureCode: null,
    canvas: null,
    activeAnnotation: null
}, action) => {
    switch (action.type) {
        case 'STORE_JOIN_CODE':
            return {
                ...state,
                lectureCode: action.joinCode
            }
        case 'LOAD_CANVAS_FROM_JSON':
            // Only update the stored canvasJSON if the lecture code is for this lecture
            let joinCode = action.joinCode;
            if (state.lectureCode !== joinCode) {
                return state;
            }

            let canvasJSON = action.canvasJSON;
            state.canvas.loadFromJSON(canvasJSON);
            return {
                ...state,
                canvas: state.canvas
            }
        case 'SET_INITIAL_CANVAS':
            return {
                ...state,
                canvas: action.canvas
            }
        case 'CANVAS_RECT_ADDED':
            {
                let rect = new fabric.Rect({
                    width: 300,
                    height: 125,
                    fill: HIGHLIGHTED_ANNOTATION_FILL_COLOR,
                    stroke: ANNOTATION_STROKE_COLOR,
                    strokeWidth: HIGHLIGHTED_ANNOTATION_STROKE_WIDTH,
                    hasRotatingPoint: false,
                    hasControls: true,
                    hasBorders: false,
                    selectable: true,
                    evented: true
                });

                rect.toObject = (function (toObject) {
                    return function () {
                        return fabric.util.object.extend(toObject.call(this), {
                            _id: this._id
                        });
                    };
                })(rect.toObject);

                rect._id = uuidv1();

                state.canvas.add(rect);

                return {
                    ...state,
                    canvas: state.canvas,
                    activeAnnotation: rect
                }
            }
        case 'CANVAS_RECT_REMOVED':
            {
                state.canvas.forEachObject((object) => {
                    if (object && object.type === 'rect' && object._id === action.objectId) {
                        state.canvas.remove(object);
                        state.canvas.renderAll();
                        return {
                            ...state,
                            canvas: state.canvas,
                            activeAnnotation: null
                        };
                    }
                });

                return {
                    ...state
                };
            }
        case 'HIGHLIGHT_RECT':
            {
                state.canvas.forEachObject((object) => {
                    if (object.type === 'rect' && object._id === action.objectId) {
                        object.set({
                            fill: HIGHLIGHTED_ANNOTATION_FILL_COLOR,
                            strokeWidth: HIGHLIGHTED_ANNOTATION_STROKE_WIDTH
                        });
                    }
                });
                state.canvas.renderAll();
                return {
                    ...state,
                    canvas: state.canvas
                }
            }
        case 'UNHIGHLIGHT_RECT':
            {
                state.canvas.forEachObject((object) => {
                    if (object.type === 'rect') {
                        object.set({
                            fill: UNHIGHLIGHTED_ANNOTATION_FILL_COLOR,
                            strokeWidth: UNHIGHLIGHTED_ANNOTATION_STROKE_WIDTH
                        });
                    }
                });
                state.canvas.renderAll();
                return {
                    ...state,
                    canvas: state.canvas
                }
            }
        case 'FREEZE_CANVAS_OBJECTS':
            state.canvas.forEachObject((object) => {
                object.set({
                    selectable: false,
                    evented: false,
                    hasControls: false
                });
            });
            state.canvas.renderAll();
            return {
                ...state,
                canvas: state.canvas
            };
        case 'ACTIVATE_CANVAS_DRAWING_MODE':
            state.canvas.isDrawingMode = true;
            state.canvas.freeDrawingBrush.width = 5;
            state.canvas.freeDrawingBrush.color = 'black';
            return {
                ...state,
                canvas: state.canvas,
                activeAnnotation: null
            };
        case 'DEACTIVATE_CANVAS_DRAWING_MODE':
            state.canvas.isDrawingMode = false;
            state.canvas.selection = false;
            state.canvas.forEachObject((object) => {
                object.set({
                    selectable: false,
                    evented: false,
                    hasControls: false
                });
            });
            return {
                ...state,
                canvas: state.canvas
            };
        case 'HIDE_ANNOTATIONS':
            state.canvas.forEachObject((object) => {
                if (object.type === 'rect') {
                    object.set({
                        opacity: 0
                    });
                }
            });
            state.canvas.renderAll();

            return {
                ...state,
                canvas: state.canvas
            }
        case 'SHOW_ANNOTATIONS':
            state.canvas.forEachObject((object) => {
                if (object.type === 'rect') {
                    object.set({
                        opacity: 1
                    });
                }
            });
            state.canvas.renderAll();

            return {
                ...state,
                canvas: state.canvas
            }
        default:
            return state;
    }
}

export default RealtimeReducer;