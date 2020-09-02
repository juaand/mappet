const hbs = require('hbs')
const path = require('path')

hbs.registerPartials(path.join(__dirname, '../views/partials'))

hbs.registerHelper('date', (date) => {
  const format = (s) => (s < 10 ? '0' + s : s)
  var d = new Date(date)
  return [format(d.getDate()), format(d.getMonth() + 1), d.getFullYear()].join(
    '/'
  )
})

hbs.registerHelper('ifvalue', function (conditional, options) {
  if (conditional == options.hash.equals) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})

hbs.registerHelper('small', (cat) => {
  return cat.toLowerCase()
})
