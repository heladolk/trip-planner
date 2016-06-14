/*
    PointOfInterest Class and Methods Definition
*/
function PointOfInterest(config) {
  if(!config) {
    config = {};
  }
  this.id = config.id || "";
  this.name = config.localizedNames[0].value || "";
  this.address = config.localizedNames[0].extendedValue || "";
  this.category = config.tags.common.subClassification.value || "";
  this.score = Math.floor(config.tags.score.popularity.value) || 0;
  this.latitude = config.position.coordinates[0] || "";
  this.longitude = config.position.coordinates[1] || "";
  this.mapChecked = false; // initial value
}

// Add points of interest to table
PointOfInterest.prototype.render = function(mapResult) {
  var point=this;

  $('#poi-table').css('display', 'block');

  var pointRow = $('<tr>');
  $('#poi-table').append(pointRow);

  var pointName = $('<td class="point-name">');
  pointName.text(this.name);
  pointRow.append(pointName);

  var pointCat = $('<td>');
  pointCat.text(this.category);
  pointRow.append(pointCat);

  var pointScore = $('<td>');
  pointScore.text(this.score);
  pointRow.append(pointScore);

  var pointDistance = $('<td>');
  pointDistance.text(mapResult.distance);
  pointRow.append(pointDistance);

  var pointMapCheck = $('<td>');
  pointRow.append(pointMapCheck);
  var pointCheckbox = $('<input type=checkbox class="map-check">');
  pointCheckbox.click(function() {
    if($(this).is(":checked")) {
      $(this).addClass('map-selected');
      point.mapChecked = "true";
    } else{
      $(this).removeClass('map-selected');
      point.mapChecked = "false";
    };
  });
  pointMapCheck.append(pointCheckbox);


};
