"use strict"

var numHotels;
var sortBy; // other values: starrating, guestrating
var sortOrder = "desc";
var hotelRadius = "10mi";

$(document).ready(function() {
  $('#hotel-btn').click(function() {
    refPlace = $('#ref-place').val();
    startDate = $('#start-date').val();
    endDate = $('#end-date').val();
    numHotels = $("#hotel-num").val() || "25";
    sortBy = $("#hotel-sort").val() || "starrating";
    searchHotels(refPlace, startDate, endDate);
  });

  $(".hotel-num-list li").click(function() {
    $("#hotel-num").text($(this).text());
    $("#hotel-num").val($(this).text());
  });

  $(".hotel-sort-list li").click(function() {
    $("#hotel-sort").text($(this).text());
    $("#hotel-sort").val($(this).text());
  });
});

function searchHotels(refPlace, startDate, endDate) {
  $.ajax({
    url:`http://localhost:3000/api/hotel`,
    // url: `https://salty-lake-14644.herokuapp.com/api/hotel`,
    method: "POST",
    data: {refPlace: refPlace, startDate: startDate, endDate: endDate},
  })
  .done(function(data) {
    var hotelsArr = data.hotelList.map(function(hotel) {
      return new Hotel(hotel);
    })
    hotelsArr.forEach(function(hotel) {
      hotel.getHotelInfo();
    });
  })
  .fail(function(error) {
    console.log(error);
    console.log("Error happened in searchHotels!");
  });
}

Hotel.prototype.getHotelInfo = function() {
  var hotel = this;
  var hotelId = hotel.id;
  $.ajax({
    url:`http://localhost:3000/api/hotel/${hotelId}`,
    // url: `https://salty-lake-14644.herokuapp.com/api/hotel`,
    method: "GET",
  })
  .done(function(data) {
    hotel.detailsUrl = data.deepLinkUrl;
    hotel.amenities = data.hotelAmenities;
    hotel.render();
  })
  .fail(function(error) {
    console.log(error);
    console.log("Error happened in getHotelInfo!");
  });
}
