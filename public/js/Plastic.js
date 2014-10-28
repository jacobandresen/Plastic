
window.onload = function () {

function Plastic() {
  var data = {
     tables: [],
     lines: []
  };

  var canvas = this.__canvas = new fabric.Canvas('c', {
       selection: false
   });
   fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

   function makeTable(x,y) {
       var c = new fabric.Rect({
                 left: x,
                 top: y,
                 width: 50,
                 height: 100,
                 strokeWidth: 1,
                 fill: '#fff',
                 stroke: 'black'
       });
       c.hasControls = c.hasBorders = false;
       c.on('selected', function (option) {
           console.log("selected:%o", c);
           option.e.stopPropagation();
           option.e.cancelBubble=true;
       });

       data.tables.push(c);
                                                                                                   return c;
       function makeRelation(id1, id2) {
           var line = new fabric.Line(coords, {
                                      fill: 'red',
                                      stroke: 'black',
                                      strokeWidth: 1,
                                      selectable: false
                      });
           data.lines.push(line);
           return line;
       }

       function init () {
           canvas.on('mouse:down', function (options) {
               console.log("mouse:down:%o", options);
               canvas.add(makeTable(
                   options.e.clientX,
                   options.e.clientY)
               );
              options.e.stopPropagation();
              options.e.cancelBubble=true;
                                                                                                                                                   });             
              canvas.on('object:moving', function (e) {
                  var p = e.target;
                  canvas.renderAll();
              });

       }

       exports= {};
       exports.save = function () {
           alert(data);
       };

       $('#save').on('click', function () {
          exports.save();
                                                                                                    });
        init();
      return exports;
    };

 };

    console.log("startup");
    var p = new Plastic();
}
