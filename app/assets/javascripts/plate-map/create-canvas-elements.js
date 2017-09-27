var plateLayOutWidget = plateLayOutWidget || {};

(function($, fabric) {

    plateLayOutWidget.createCanvasElements = function() {
        // this class manages creating all the elements within canvas
        return {

            spacing: 48,

            _canvas: function() {
                // Those 1,2,3 s and A,B,C s
                this._fixRowAndColumn();

                // All those circles in the canvas.
                this._putCircles();

            },

            _fixRowAndColumn: function() {
                var scale = this.scaleFactor;
                var spacing = this.spacing * scale;
                var cols = this.dimensions.cols;
                var rows = this.dimensions.rows;

                // For column
                for (var i = 1; i <= cols; i++) {
                    var tempFabricText = new fabric.IText(i.toString(), {
                        fill: 'black',
                        originX: 'center',
                        originY: 'center',
                        fontSize: 14 * scale,
                        top: 10 * scale,
                        left: i * spacing,
                        fontFamily: '"Roboto", Arial, sans-serif',
                        selectable: false,
                        fontWeight: "400"
                    });

                    this.mainFabricCanvas.add(tempFabricText);
                }

                // for row
                for (var i = 1; i <= rows; i++) {
                    var tempFabricText = new fabric.IText(this.rowIndex[i-1], {
                        fill: 'black',
                        originX: 'center',
                        originY: 'center',
                        fontSize: 14 * scale,
                        left: 5 * scale,
                        top: i * spacing,
                        fontFamily: '"Roboto", Arial, sans-serif',
                        selectable: false,
                        fontWeight: "400"
                    });

                    this.mainFabricCanvas.add(tempFabricText);
                }
            },

            _putCircles: function() {
                var scale = this.scaleFactor;
                var spacing = this.spacing * scale;
                var cols = this.dimensions.cols;
                var rows = this.dimensions.rows;
                var tileCounter = 0;
                for (var i = 0; i < rows; i++) {

                    for (var j = 0; j < cols; j++) {
                        var tile = new fabric.Circle({
                            width: spacing,
                            height: spacing,
                            left: (j + 1) * spacing,
                            top: (i + 1) * spacing,
                            radius: 22 * scale,
                            originX: 'center',
                            originY: 'center',
                            name: "tile-" + i + "X" + j,
                            type: "tile",
                            hasControls: false,
                            hasBorders: false,
                            lockMovementX: true,
                            lockMovementY: true,
                            index: tileCounter++,
                            wellData: {}, // now we use this to show the data in the tabs when selected
                            selectedWellAttributes: {},
                            selectable: false
                        });

                        tile.setGradient("fill", {
                            type: "radial",
                            y1: 2 * scale,
                            y2: 2 * scale,
                            r1: tile.radius - (2 * scale),
                            r2: tile.radius,
                            colorStops: {
                                0: 'rgba(0,0,0,0.1)',
                                1: 'rgba(0,0,0,0.2)'
                            }
                        });

                        var highlight = new fabric.Rect({
                            width: spacing,
                            height: spacing,
                            left: (j + 1) * spacing,
                            top: (i + 1) * spacing,
                            originX: 'center',
                            originY: 'center',
                            fill: "rgba(0,0,0,0.4)",
                            selectable: false,
                            visible: false
                        });

                        tile.highlight = highlight;

                        this.allTiles.push(tile);
                        this.mainFabricCanvas.add(tile);
                        this.mainFabricCanvas.add(highlight);
                    }
                }

                this._addLargeRectangleOverlay();
                this._addWellDataToAll();
                this._addUnitDataToAll();
                this._fabricEvents();
            },

            _addLargeRectangleOverlay: function() {

                this.overLay = new fabric.Rect({
                    width: 632,
                    height: 482,
                    left: 0,
                    top: 0,
                    opacity: 0.0,
                    originX: 'left',
                    originY: 'top',
                    lockMovementY: true,
                    lockMovementX: true,
                    selectable: false
                });

                this.mainFabricCanvas.add(this.overLay);
            }
        };
    }
})(jQuery, fabric);