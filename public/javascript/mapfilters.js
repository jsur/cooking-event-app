// https://refreshless.com/nouislider/examples/#section-dates
// Create a new date from a string, return as a timestamp.
function timestamp (str) {
  return new Date(str).getTime();
}

const dateSlider = document.getElementById('slider-date');

noUiSlider.create(dateSlider, {
// Create two timestamps to define a range.
  'range': {
    'min': timestamp(Date.now()),
    'max': timestamp(new Date().setFullYear(new Date().getFullYear() + 1))
  },

  // Steps of one week
  'step': 7 * 24 * 60 * 60 * 1000,

  // Two more timestamps indicate the handle starting positions.
  'start': [timestamp(Date.now()), timestamp('2019')],

  'connect': true

  // No decimals
  // 'format': wNumb({ 'decimals': 0 })
});

const dateValues = [
  document.getElementById('event-start'),
  document.getElementById('event-end')
];

dateSlider.noUiSlider.on('update', (values, handle) => {
  dateValues[handle].innerHTML = formatDate(new Date(+values[handle]));
});

// Append a suffix to dates.
// Example: 23 => 23rd, 1 => 1st.
function nth (date) {
  if (date > 3 && date < 21) {
    return 'th';
  }
  switch (date % 10) {
  case 1: return 'st';
  case 2: return 'nd';
  case 3: return 'rd';
  default: return 'th';
  }
}

// Create a string representation of the date.
function formatDate (date) {

  const weekdays = [
    'Sunday', 'Monday', 'Tuesday',
    'Wednesday', 'Thursday', 'Friday',
    'Saturday'
  ];

  const months = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December'
  ];

  return weekdays[date.getDay()] + ', ' +
        date.getDate() + nth(date.getDate()) + ' ' +
        months[date.getMonth()] + ' ' +
        date.getFullYear();
}

// Price slider

const priceSlider = document.getElementById('slider-price');

noUiSlider.create(priceSlider, {
  'range': {
    'min': [0],
    'max': [200]
  },
  'connect': true,
  'start': [0, 200]
});

const priceValues = [
  document.getElementById('price-div-min'),
  document.getElementById('price-div-max')
];

priceSlider.noUiSlider.on('update', (values, handle) => {
  const min = values[0].split('.')[0];
  const max = values[1].split('.')[0];
  document.getElementById('price').innerHTML = `Min: ${min} € Max: ${max} €`;
});
