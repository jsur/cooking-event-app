// Here we can utilize our API routes with axios

let map;
let markers = [];
const mapDiv = document.getElementById('googlemap');
const mapOptions = {
  'center': { 'lat': 41.3787784, 'lng': 2.1658517 },
  'zoom': 12
};

const loadPlaceOpts = {
  'minprice': 0,
  'maxprice': 500,
  'fromdate': Date.now(),
  'todate': new Date().setFullYear(new Date().getFullYear() + 2)
};

const filterHandles = document.querySelectorAll('.noUi-handle');
filterHandles.forEach((handle) => {
  handle.addEventListener('mouseup', () => {

    currentHandleValue = parseInt($(handle).attr('aria-valuetext'), 10);

    if ($(handle).parents('div#slider-date').length > 0) {
      if ($(handle).hasClass('noUi-handle-lower')) {
        loadPlaceOpts.fromdate = $(handle).attr('aria-valuetext');
      } else {
        loadPlaceOpts.todate = $(handle).attr('aria-valuetext');
      }
    }

    if ($(handle).parents('div#slider-price').length > 0) {
      if ($(handle).hasClass('noUi-handle-lower')) {
        loadPlaceOpts.minprice = currentHandleValue;
      } else {
        loadPlaceOpts.maxprice = currentHandleValue;
      }
    }

    loadPlaces(map, map.center.lat(), map.center.lng(), loadPlaceOpts);
  });
});

function loadPlaces (map, lat, lng, loadPlaceOpts) {

  if (lat === '' || lng === '') {
    lat = mapOptions.center.lat;
    lng = mapOptions.center.lng;
  }

  axios.get(`/api/events/near?lat=${lat}&lng=${lng}&minprice=${loadPlaceOpts.minprice}&maxprice=${loadPlaceOpts.maxprice}&fromdate=${loadPlaceOpts.fromdate}&todate=${loadPlaceOpts.todate}`)
    .then((response) => {
      const events = response.data;
      renderEvents(events);

      markers.forEach((marker) => {
        marker.setMap(null);
      });

      if (!events.length) {
        console.log('No places found.');

        return;
      }

      markers = events.map((event) => {
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
        <p>Date: ${event.date.slice(0, 10)}</p>
        <a href='/event/${event._id}'>Event details</a>
      </div>
    `);
  });
}

function makeMap (element) {
  if (!mapDiv) {
    return;
  }

  map = new google.maps.Map(mapDiv, mapOptions);

  map.addListener('dragend', () => {
    loadPlaces(map, map.center.lat(), map.center.lng(), loadPlaceOpts);
  });
  loadPlaces(map, '', '', loadPlaceOpts);
};

makeMap(mapDiv);
