/*
    PointOfInterest Class and Methods Definition
*/
function Hotel(config) {
  if(!config) {
    config = {};
  }
  this.id = config.hotelId || null;
  this.name = config.name || null;
  this.address = config.address || null;
  this.city = config.city || null;
  this.price = (config.lowRate === undefined)? "No info": Math.floor(config.lowRate);
  this.description = config.shortDescription || null;
  this.starRating = config.hotelStarRating || null;
  this.guestRating = config.hotelGuestRating || null;
  this.numReviews= config.totalReviews || null;
  this.img = "http://images.trvl-media.com/" + config.largeThumbnailUrl || null;
  this.detailsUrl = null;
}

Hotel.prototype.render = function() {
  var hotelSection = $('#hotel-section');
  var hotelMedia = $('<div class="media">');
  hotelSection.append(hotelMedia);
  var hotelMediaLeft = $('<div class="media-left media-middle">');
  hotelMedia.append(hotelMediaLeft);
  var hotelImage = $(`<img src="${this.img}" alt="hotel image" class="media-object">`);
  hotelMediaLeft.append(hotelImage);
  var hotelMediaBody = $('<div class="media-body">');
  hotelMedia.css("background-color", "white");
  hotelMedia.css("border-radius", "1%");
  hotelMedia.append(hotelMediaBody);
  var hotelMediaHeading = $(`<h4 class="media-heading">${this.name}`);
  hotelMediaBody.append(hotelMediaHeading);
  var hotelTitle = $('<h4>');
  hotelTitle.text(this.name);
  hotelMediaBody.append(hotelTitle);
  var hotelDesc = $('<p>');
  var hotelCity = $('<h5>');
  hotelCity.text(this.city);
  hotelMediaBody.append(hotelCity);
  var hotelDesc = $('<p>');
  hotelDesc.text(this.description);
  hotelMediaBody.append(hotelDesc);
  var hotelPrice = $('<p>');
  hotelPrice.text(`Price: $${this.price} avg/night`);
  hotelMediaBody.append(hotelPrice);
  var hotelRating = $('<p>');
  hotelRating.text(`Star Rating: ${this.starRating}`);
  hotelMediaBody.append(hotelRating);
  var numReviews = $('<p>');
  numReviews.text(`Guest Reviews:  ${this.guestRating}(${this.numReviews} reviews)`);
  hotelMediaBody.append(numReviews);
  var hotelUrl = $(`<a target="_blank" href="${this.detailsUrl}">More Info on Expedia.com</a><br>`);
  hotelMediaBody.append(hotelUrl);
  var hotelBtn = $('<p><a href="#" class="btn btn-success" role="button">Add to Itinerary</a></p>');
  hotelMediaBody.append(hotelBtn);
}
