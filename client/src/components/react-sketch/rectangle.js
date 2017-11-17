/*eslint no-unused-vars: 0*/
import FabricCanvasTool from './fabrictool';
const fabric = require('fabric').fabric;

class Rectangle extends FabricCanvasTool {

    configureCanvas(props) {
        let canvas = this._canvas;
        canvas.isDrawingMode = canvas.selection = false;
        canvas.forEachObject((o) => o.selectable = o.evented = false);
        this._width = 3;
        this._color = 'darkgrey';
        this._fill = 'rgba(104, 204, 202, 0.3)';
    }

    addInstance(o) {
        this.rect = new fabric.Rect({
            width: 300,
            height: 200,
            fill: this._fill,
            stroke: this._color,
            strokeWidth: this._width,
            hasRotatingPoint: false,
            hasControls: true,
            hasBorders: true,
            selectable: true,
            evented: true
        });

        this.rect.toObject = (function(toObject) {
            return function() {
              return fabric.util.object.extend(toObject.call(this), {
                _id: this._id
              });
            };
        })(this.rect.toObject);
    
        // TODO: Generate random id w/ mongoose IDs possibly?
        this.rect._id = '123456';       

        this._canvas.add(this.rect);

        // Give all rectangles a z-index
        this.rect.moveTo(1); 

        return this.rect._id;
    }

    removeInstance(id) {
        let objects = this._canvas.getObjects();
        let target = null;
        for (let i = 0; i < objects.length; i++) {
            let shape = objects[i];
            if (shape._id === id) {
                target = shape;
                break;
            }
        }
        if (target != null) {
            this._canvas.remove(target);
            return true;
        }
    
        return false;
    };
}

export default Rectangle;