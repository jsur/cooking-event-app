// Here we can utilize our API routes with axios

let map = '';
let markers = [];
const mapDiv = document.getElementById('googlemap');
const mapOptions = {
  'center': { 'lat': 41.3787784, 'lng': 2.1658517 },
  'zoom': 12
};

// Default values for loadPlaceOpts object
const currentdate = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
const twoyearsahead = currentdate.replace(currentdate.slice(0, 4), '2019');

const loadPlaceOpts = {
  'minprice': 0,
  'maxprice': 500,
  'fromdate': currentdate,
  'todate': twoyearsahead
};

const filterHandles = document.querySelectorAll('.noUi-handle');
filterHandles.forEach((handle) => {
  handle.addEventListener('mouseup', () => {

    const currentHandleValue = $(handle).attr('aria-valuetext');

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

const dateInputs = document.querySelectorAll('.date-input');
dateInputs.forEach((input) => {
  input.addEventListener('change', () => {
    const fromdate = document.getElementById('fromdate').value;
    const todate = document.getElementById('todate').value;

    loadPlaceOpts.fromdate = fromdate ? fromdate : loadPlaceOpts.fromdate;
    loadPlaceOpts.todate = todate ? todate : loadPlaceOpts.todate;

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
        <p class="event-title">${event.title}</p>
        <p class="event-details">Food type: ${event.foodtype}</p>
        <p class="event-details">Price: ${event.price}</p>
        <p class="event-details">Date: ${event.date.slice(0, 10)}</p>
        <p class="event-capacity-check">Places left: ${event.capacity - event.attendees.length}</p>
        <a class="event-details-link" href='/event/${event._id}'>Event details</a>
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
