import uuidv1 from 'uuid/v1';
const fabric = require('fabric').fabric;

var RealtimeReducer = (state = {
    lectureCode: null,
    canvasJSON: null,
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
            let joinCode = action.canvasJSON["joinCode"];
            if (state.lectureCode !== joinCode) {
                return state;
            }

            let canvasJSON = action.canvasJSON["data"];
            return {
                ...state,
                joinCode: joinCode,
                canvasJSON: canvasJSON
            }
        case 'SET_INITIAL_CANVAS':
            return {
                ...state,
                canvas: action.canvas
            }
        case 'CANVAS_RECT_ADDED':
            let rect = new fabric.Rect({
                width: 300,
                height: 200,
                fill: 'rgba(104, 204, 202, 0.3)',
                stroke: 'darkgrey',
                strokeWidth: 3,
                hasRotatingPoint: false,
                hasControls: true,
                hasBorders: true,
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
        case 'CANVAS_RECT_REMOVED':
            let objects = state.canvas.getObjects();
            for (let i = 0; i < objects.length; i++) {
                let shape = objects[i];
                if (shape._id === action.objectId) {
                    state.canvas.remove(shape);
                }
            }

            return {
                ...state,
                canvas: state.canvas,
                activeAnnotation: null
            };
        case 'FREEZE_CANVAS_OBJECTS':
            state.canvas.forEachObject((o) => o.selectable = o.evented = o.hasControls = false);
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
            state.canvas.forEachObject((o) => o.selectable = o.evented = o.hasControls = false);
            return {
                ...state,
                canvas: state.canvas
            };
        default:
            return state;
    }
}

export default RealtimeReducer;