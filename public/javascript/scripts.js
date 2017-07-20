$('.button-eventdescription').on('click', () => {
  $('.p-eventdescription').toggle(400);
});


const input = document.getElementById('location');
const autocomplete = new google.maps.places.Autocomplete(input);


autocomplete.addListener('place_changed', function () {
  const place = autocomplete.getPlace();
  $('#latitude').val(place.geometry.location.lat());
  $('#longitude').val(place.geometry.location.lng());
  $('#address').val(place.formatted_address);
  console.log(place.geometry.location.lat());
  console.log(place.geometry.location.lng());
  console.log(place.formatted_address);
});
