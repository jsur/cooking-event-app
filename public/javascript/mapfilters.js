// https://refreshless.com/nouislider/
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
