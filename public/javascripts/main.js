"use strict"

$(document).ready(function() {
  $('.feature-btn').click(function() {
    refPlace = $('#ref-place').val();
    // startDate = $('#start-date').val();
    // endDate = $('#end-date').val();
  });

  // Show Points of Interest
  $('#point-btn').click(function() {
    poiDistance = $('#poi-distance').val();
    poiTravelMode = $("#poi-tmode").val() || "DRIVING";

    $('#poi-table tbody').empty();
    $('#showmap-btn').remove();
    initPOICall();
  });

  // POI Travel Mode Dropdown Menu
  $(".poi-tmode-list li").click(function() {
    $("#poi-tmode").text($(this).text());
    $("#poi-tmode").val($(this).text());
  });

  // Search Nearby Places
  $('#search-btn').click(function() {
    var searchRefPlace = $('#search-place').val() || refPlace;
    searchString = $('#search-cat').val() || "RESTAURANT";
    searchAddressToGeocode(searchRefPlace);
  });

  // Build Itinerary
  $("#iti-btn").click(function() {
    buildItinerary();
  })

  // Things to Do
  $('#to-do-btn').click(function() {
    activityApiCall();
  });

});
