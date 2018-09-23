import tools from '../tools/tools.js'
import context from '../context.js'
import exts from '../utils/exts.js'
import map from '../map/map.js'

var cursors = [
    { 
        name: 'NONE', 
        tool: tools.NONE,
        config: {
            index: 0,
            image: "",
            color: ""
        }
    },
    { 
        name: 'ZOOM', 
        tool: tools.ZOOM,
        config: {
            index: 1,
            image: "img/cursor/zoom.svg",
            color: "#fff"
        }
    },
    { 
        name: 'DRAG', 
        tool: tools.DRAG,
        config: {
            index: 2,
            image: "img/cursor/drag.svg",
            color: "#fff"
        }
    },
    { 
        name: 'PUSH', 
        tool: tools.PUSH_TERRAIN,
        config: {
            index: 3,
            image: "img/cursor/push.svg",
            color: "#fff"
        }
    },
    { 
        name: 'PULL',
        tool: tools.PULL_TERRAIN,
        config: {
            index: 4,
            image: "img/cursor/pull.svg",
            color: "#fff"
        }
    },
];

var cursor = {
    /*
     *  Accepts a tool type, resolving it to a config object containing
     *  information about the correct type of cursor to display for the tool.
     */
    assignCursorForTool: function(toolMode) {
        var filteredCursors = cursors.filter(x => x.tool == toolMode);
        if (filteredCursors.length != 1) return;
        var cursorConfig = filteredCursors[0].config;
        this.bindCursor(cursorConfig);
    },

    /*
     *  Draws the cursor on the mouse.
     */
    bindCursor: function(config) {

        // Hide default cursor
        var canvas =  context.getCanvas();
        exts.addClass(canvas, 'tool-active');

        // Load image
        var img = exts.loadSvg(config.image);
        img.onload = function() {

            // Bind image draw to mousemove
            window.addEventListener('mousemove', function(e) {
                var scale = 50;
                var x = e.pageX - scale/2;
                var y = e.pageY - scale/2;
                var ctx = context.getContext();

                map.draw();
                map.popTransform();
                ctx.drawImage(img, x, y, scale, scale);
                map.pushTransform();
            });
        };
    },

    /*
     *  Removes any cursors.
     */
    unbindCursor: function() {
        
        var canvas =  context.getCanvas();
        exts.removeClass(canvas, 'tool-active');
    }
};

export default cursor;