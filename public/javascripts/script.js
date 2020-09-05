document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('IronGenerator JS imported successfully!')
  },
  false
)

$(document).ready(function () {
  bsCustomFileInput.init()
})

// CAROUSEL
const rangeSlider = function () {
  const slider = $('.range-slider'),
    range = $('.range-slider__range'),
    value = $('.range-slider__value')

  slider.each(function () {
    value.each(function () {
      let value = $(this).prev().attr('value')
      $(this).html(value)
    })

    range.on('input', function () {
      $(this).next(value).html(this.value)
    })
  })
}

rangeSlider()

// COPY TO CLIPBBOARD
const copyToClipboard = function () {
  new ClipboardJS('.copy-clipboard')

  document.querySelector('.copy-clipboard').classList.add('show-tooltip')
}

// LIKES
function like(e) {
  const button = e.currentTarget
  const like = `${button.id}/like`

  axios
    .post(like)
    .then((res) => {
      const add = res.data.like
      button.querySelector('.likes-count').innerText =
        Number(button.querySelector('.likes-count').innerText) + add
    })
    .catch(console.error)
}
