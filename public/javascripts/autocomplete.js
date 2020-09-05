const defaultBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(27.7567, 43.68333),
  new google.maps.LatLng(-17.93394, 4.2899)
)

const options = {
  bounds: defaultBounds
}

const input = document.getElementById('address')

const autocomplete = new google.maps.places.Autocomplete(input, options)
