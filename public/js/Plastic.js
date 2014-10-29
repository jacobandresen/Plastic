/*global $,document,alert,fabric*/

function Plastic() {

    var canvas = new fabric.Canvas('c', { selection: false }),
        data = {
            tables: [],
            lines: []
        },
        exports = {};

    fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

    function addTable(table) {
        table.on('selected', function (option) {
            //make sure that we do not add a new table here
            option.e.stopPropagation();
            option.e.cancelBubble = true;
        });

        data.tables.push(table);
        canvas.add(table);
    }

    function createTable(x,y) {
       var table = new fabric.Rect({
            left       : x,
            top        : y,
            width      : 50,
            height     : 100,
            strokeWidth: 1,
            fill       : '#fff',
            stroke     : 'black'
        });
        table.hasControls = false;
        table.hasBorders = false;
        return table;
    }

    function loadData(data) {
        this.data = data;
        $(this.data.tables).each(function (obj) { addTable(obj); });
    }

    function getTable(id) {
        return data.tables[id];
    }

    function createRelation(idFrom, idTo) {
        var from   = getTable(idFrom),
            to     = getTable(idTo),
            coords = [from.left, from.top, to.left, to.top],
            line   = new fabric.Line(coords, {
                                  fill: 'red',
                                  stroke: 'black',
                                  strokeWidth: 1,
                                  selectable: false
                   });
        return line;
    }

    function addRelation(relation) {
        data.lines.push(relation);
        canvas.add(relation);
    }

    function registerEvents() {
        canvas.on('mouse:down', function (options) {
          
            //if we are not clicking an object .. then we create a new one
            if (!options.target) {
                addTable(createTable(options.e.clientX, options.e.clientY));
                options.e.stopPropagation();
                options.e.cancelBubble = true;
                canvas.renderAll();
            }
        });

        //canvas.on('object:moving', function (e) {
        //   var p = e.target;
        //   canvas.renderAll();
        //});

        $(this.saveButtton).on('click', function () {
            exports.save();
        });
    }

    registerEvents();

    exports.addTable       = addTable;
    exports.createRelation = createRelation;
    exports.addRelation    = addRelation;
    exports.loadData       = loadData;

    exports.save = function () {
        alert(data);
    };

    return exports;
}

$(document).ready(function () {
    new Plastic();
});
