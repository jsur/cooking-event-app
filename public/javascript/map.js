// Here we can utilize our API routes with axios

const mapDiv = document.getElementById('googlemap');
const mapOptions = {
  'center': { 'lat': 41.3787784, 'lng': 2.1658517 },
  'zoom': 12
};

function loadPlaces (map, lat, lng) {

  if (lat === undefined && lng === undefined) {
    lat = mapOptions.center.lat;
    lng = mapOptions.center.lng;
  }

  axios.get(`/api/events/near?lat=${lat}&lng=${lng}`)
    .then((response) => {
      const events = response.data;
      renderEvents(events);
      if (!events.length) {
        console.log('No places found.');

        return;
      }

      const markers = events.map((event) => {
        const eventLng = event.location.coordinates[0];
        const eventLat = event.location.coordinates[1];
        const position = { 'lat': eventLat, 'lng': eventLng};
        const marker = new google.maps.Marker({ map, position });
        marker.place = event;

        return marker;
      });

      const infoWindow = new google.maps.InfoWindow();

      markers.forEach((marker) => {
        marker.addListener('click', () => {
          const html = `
            <p>Name: ${marker.place.title}</p>
            <a href='/event/${marker.place._id}'>Event details</a>
          `;
          infoWindow.setContent(html);
          infoWindow.open(map, marker);
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function renderEvents (events) {
  const eventsContainer = $('#mapevents');
  // first clear events
  eventsContainer.html('');

  if (events.length === 0) {
    $(eventsContainer).append(`
      <div class="eventcard">
        <p>No events here!</p>
      </div>
    `);
  }

  events.forEach((event) => {

    $(eventsContainer).append(`
      <div class="eventcard">
        <p>Name: ${event.title}</p>
        <p>Food type: ${event.foodtype}</p>
        <p>Price: ${event.price}</p>
        <a href='/event/${event._id}'>Event details</a>
      </div>
    `);
  });
}

function makeMap (element) {
  if (!mapDiv) {
    return;
  }

  const map = new google.maps.Map(mapDiv, mapOptions);

  map.addListener('dragend', () => {
    loadPlaces(map, map.center.lat(), map.center.lng());
  });
  loadPlaces(map);
};

makeMap(mapDiv);
