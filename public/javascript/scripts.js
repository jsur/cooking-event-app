$('.button-eventdescription').on('click', () => {
  $('.p-eventdescription').toggle(400);
});

var input = document.getElementById('location');
var autocomplete = new google.maps.places.Autocomplete(input);


autocomplete.addListener('place_changed', function() {
  var place = autocomplete.getPlace();
  $("#latitude").val(place.geometry.location.lat());
  $("#longitude").val(place.geometry.location.lng());
  console.log(place);
});
