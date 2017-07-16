// Here we can utilize our API routes with axios

const mapDiv = document.getElementById('googlemap');
const mapOptions = {
  'center': { 'lat': 2.1658517, 'lng': 41.3787784 },
  'zoom': 5
};

function loadPlaces (map, lat = mapOptions.center.lat, lng = mapOptions.center.lng) {
  axios.get(`/api/events/near?lat=${lat}&lng=${lng}`)
    .then((response) => {

      console.log(response);

    })
    .catch((error) => {
      console.log(error);
    });
}

function makeMap (element) {
  if (!mapDiv) {
    return;
  }

  const map = new google.maps.Map(mapDiv, mapOptions);
  loadPlaces(map);
};

makeMap(mapDiv);
