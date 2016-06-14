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
    console.log(numHotels, sortBy);
    searchHotels(refPlace);
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

function searchHotels(refPlace) {
  $.ajax({
    url:
    `http://terminal2.expedia.com/x/mhotels/search?city=${refPlace}&checkInDate=${startDate}&checkOutDate=${endDate}&room1=2&apikey=${expediaApiKey}`,
    method: "GET"
  })
  .done(function(data) {
    // console.log(data);
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
  $.ajax({
    url: `http://terminal2.expedia.com/x/mhotels/info?hotelId=${this.id}&apikey=${expediaApiKey}`,
    method: "GET"
  })
  .done(function(data) {
    console.log(data);
    hotel.detailsUrl = data.deepLinkUrl;
    hotel.amenities = data.hotelAmenities;
    console.log(hotel);
    hotel.render();
  })
  .fail(function(error) {
    console.log(error);
    console.log("Error happened in getHotelInfo!");
  });
}
