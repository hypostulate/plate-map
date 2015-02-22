var plateLayOutWidget = plateLayOutWidget || {};

(function($, fabric) {

  plateLayOutWidget.checkBox = function() {
    // For those check boxes associated with every field in the tab
    return {

      globalSelectedAttributes: {},

      _addCheckBox: function(fieldArray, fieldArrayIndex, data) {

        var checkImage = $("<img>").attr("src", this.imgSrc + "/dont.png").addClass("plate-setup-tab-check-box")
        .data("clicked", false).data("linkedFieldId", data.id);
        $(fieldArray[fieldArrayIndex - 1]).find(".plate-setup-tab-field-left-side").html(checkImage);
        this._applyCheckboxHandler(checkImage); // Adding handler for change the image when clicked
        fieldArray[fieldArrayIndex - 1].checkbox = checkImage;
        return checkImage;
      },

      _applyCheckboxHandler: function(checkBoxImage) {
        // We add checkbox handler here, thing is it s not checkbox , its an image and we change
        // source
        var that = this;
        $(checkBoxImage).click(function(evt, machineClick) {

          if($(this).data("clicked")) {
            $(this).attr("src", that.imgSrc + "/dont.png");
          } else {
            $(this).attr("src", that.imgSrc + "/do.png");
          }

          $(this).data("clicked", !$(this).data("clicked"));
          // when we un/select values it should reflect to the tiles selected at the moment
          that._addRemoveSelection($(this));
          // update values in allselectedObject

          // Now add corresponding field to the bottom of table.
          // that._addRemoveToBottamTable($(this));
          // incase user changes some selection after selecting some preset. It clears preset
          // machineClick says if the click is generated by machine or user
          if(that.previousPreset && ! machineClick) {
            $(that.previouslyClickedPreset).trigger("click", true);
          }

        });
      },

      _addRemoveSelection: function(clickedCheckBox) {
        // This method is invoked when any of the checkbox is un/checked. And it also add the id of the
        // corresponding field to the tile. So now a well/tile knows if particular checkbox is checkd and
        // if checked whats the value in it. because we use the value id of the element,
        // which in turn passed through attribute.
        if(clickedCheckBox.data("clicked")) {

          this.globalSelectedAttributes[clickedCheckBox.data("linkedFieldId")] = true;
          var fieldVal = $("#" + clickedCheckBox.data("linkedFieldId")).val();
          if(fieldVal) {
            this._colorMixer([]);
          }
        } else {
          delete this.globalSelectedAttributes[clickedCheckBox.data("linkedFieldId")];
          this._colorMixer([])

        }
        // For compatability remove it later
        if(this.allSelectedObjects) {
          var noOfSelectedObjects = this.allSelectedObjects.length;
          for(var objectIndex = 0;  objectIndex < noOfSelectedObjects; objectIndex++) {
            this.allSelectedObjects[objectIndex]["selectedWellAttributes"] = this.globalSelectedAttributes;
            // Look for appropriate color.
            //this._addColorCircle(this.allSelectedObjects[objectIndex]);
          }

          //this._selectTilesFromRectangle(this.startingTileIndex, this.rowCount, this.columnCount, this.CLICK);
          this._addRemoveToBottamTable();
          this.mainFabricCanvas.renderAll();
        }
      },
    };
  }
})(jQuery, fabric);
