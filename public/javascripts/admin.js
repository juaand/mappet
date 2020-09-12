const usersJson = '/admin/data/users'
const spotsJson = '/admin/data/spots'
const petsJson = '/admin/data/pets'

// User graph

axios
  .get(usersJson)
  .then((responseFromAPI) => {
    // console.log(responseFromAPI.data)

    let dates = []
    let numberOfUsers = []
    responseFromAPI.data.forEach((el) => {
      dates.push(new Date(el.createdAt).toDateString())
    })
    const numberOfDates = dates.reduce((el, date) => {
      el[date] = (el[date] || 0) + 1
      return el
    }, {})
    numberOfUsers = Object.values(numberOfDates)

    // console.log(dates)
    // console.log(numberOfUsers)

    new Chart(document.getElementById('my-chart'), {
      type: 'line',
      data: {
        labels: [...new Set(dates)],
        datasets: [
          {
            label: 'Number of users',
            borderColor: '#ea7676',
            fill: false,
            data: numberOfUsers
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 1
              }
            }
          ]
        },
        legend: { display: false },
        title: {
          display: true,
          text: 'Users per month'
        }
      }
    })
  })
  .catch((err) => console.log('Error while getting the data: ', err))

// Spots & Users graph
axios
  .all([axios.get(usersJson), axios.get(spotsJson)])
  .then(
    axios.spread(function (usersData, spotsData) {
      // console.log(usersData.data)
      // console.log(spotsData.data)

      let userDates = []
      let numberOfUsers = []

      usersData.data.forEach((el) => {
        userDates.push(new Date(el.createdAt).getMonth())
      })

      const numberOfDates = userDates.reduce((el, date) => {
        el[date] = (el[date] || 0) + 1
        return el
      }, {})

      numberOfUsers = Object.values(numberOfDates)

      // console.log(numberOfDates)
      // console.log(numberOfUsers)

      let spotDates = []
      let numberOfSpots = []

      spotsData.data.forEach((el) => {
        spotDates.push(new Date(el.createdAt).getMonth())
      })

      const numberOfUserDates = spotDates.reduce((el, date) => {
        el[date] = (el[date] || 0) + 1
        return el
      }, {})

      numberOfSpots = Object.values(numberOfUserDates)

      // console.log(spotDates)
      // console.log(numberOfSpots)

      new Chart(document.getElementById('mix-canvas'), {
        type: 'line',
        data: {
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          datasets: [
            {
              label: 'Number of users',
              borderColor: '#ea7676',
              fill: false,
              data: numberOfUsers
            },
            {
              label: 'Number of spots',
              borderColor: '#35396e',
              fill: false,
              data: numberOfSpots
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  stepSize: 50
                }
              }
            ]
          },
          legend: { display: false },
          title: {
            display: true,
            text: 'Users & Spots per month'
          }
        }
      })
    })
  )
  .catch((err) => console.log('Error while getting the data: ', err))

// Spots & Cities graph

axios.get(spotsJson).then((responseFromAPI) => {
  // console.log(responseFromAPI.data)

  let citiesCanvas = document.getElementById('cities-canvas')

  const dataArray = responseFromAPI.data

  const allLabelsData = []
  dataArray.forEach((data) => {
    allLabelsData.push(data.city)
  })

  const citiesQuantity = allLabelsData.reduce((cityQuantity, city) => {
    cityQuantity[city] = (cityQuantity[city] || 0) + 1
    return cityQuantity
  }, {})

  // console.log(JSON.stringify(Object.keys(citiesQuantity)))
  // console.log(JSON.stringify(Object.values(citiesQuantity)))
// items.sort(function (a, b) {
//   return a.value - b.value;
// })

  const sortedCities = Object.keys(citiesQuantity).sort((a, b) => citiesQuantity[b] - citiesQuantity[a])
  document.querySelector('.spot-cities-info').innerHTML = `
  <hr>
  <p class="info">At the time, the most mappet city is <strong>${sortedCities[0]}</strong> with a total of <strong>${citiesQuantity[sortedCities[0]]}</strong> spots.</p>
  `
  console.log(JSON.stringify(citiesQuantity))  
  console.log(JSON.stringify(Object.values(sortedCities)))
 

  let citiesData = {
    labels: Object.keys(citiesQuantity),
    datasets: [
      {
        data: Object.values(citiesQuantity),
        backgroundColor: [
          '#15607A',
          '#1C80A2',
          '#4FBC9F',
          '#48A786',
          '#1EA1CD',
          '#6BF1BC',
          '#FCB55F',
          '#F24438',
          '#C7331F',
          '#F88927',
          '#9F3763',
          '#FFD525',
          '#F05A28'
        ]
      }
    ]
  }

  let pieChart = new Chart(citiesCanvas, {
    type: 'doughnut',
    data: citiesData,
    options: {
      legend: {
        position: 'bottom',
        labels: {
          fontSize: 12,
          padding: 20
        }
      }
    }
  })
})

// Kind of pets

axios.get(petsJson).then((responseFromAPI) => {
  //console.log(responseFromAPI.data)

  const petsCanvas = document.getElementById('pets-canvas')
  const dataArray = responseFromAPI.data
  const allLabelsData = []
  dataArray.forEach((data) => {
    allLabelsData.push(data.animal)
  })

  const petsQuantity = allLabelsData.reduce((petQuantity, pet) => {
    petQuantity[pet] = (petQuantity[pet] || 0) + 1
    return petQuantity
  }, {})

  const sortedPets = Object.keys(petsQuantity).sort((a, b) => petsQuantity[b] - petsQuantity[a])
  document.querySelector('.kind-pets-info').innerHTML = `
  <hr>
  <p class="info">At the time, the most mappet animal is <strong>${sortedPets[0]}</strong> with a total of <strong>${petsQuantity[sortedPets[0]]}</strong>.</p>
  `

  // console.log(JSON.stringify(Object.keys(petsQuantity)))
  // console.log(JSON.stringify(Object.values(petsQuantity)))

  const petsData = {
    labels: Object.keys(petsQuantity),
    datasets: [
      {
        data: Object.values(petsQuantity),
        backgroundColor: [
          '#F88927',
          '#9F3763',
          '#FFD525',
          '#F05A28',
          '#15607A',
          '#1C80A2',
          '#4FBC9F',
          '#48A786',
          '#1EA1CD',
          '#6BF1BC',
          '#FCB55F',
          '#F24438',
          '#C7331F'
        ]
      }
    ]
  }

  let pieChart = new Chart(petsCanvas, {
    type: 'doughnut',
    data: petsData,
    options: {
      legend: {
        position: 'bottom',
        labels: {
          fontSize: 12,
          padding: 20
        }
      }
    }
  })
})

// Categories

axios.get(spotsJson).then((responseFromAPI) => {
  // console.log(responseFromAPI.data)

  let spotsCategoriesCanvas = document.getElementById('spots-categories-canvas')

  const dataArray = responseFromAPI.data

  const allLabelsData = []
  dataArray.forEach((data) => {
    allLabelsData.push(data.category)
  })

  const categoriesQuantity = allLabelsData.reduce(
    (categoryQuantity, category) => {
      categoryQuantity[category] = (categoryQuantity[category] || 0) + 1
      return categoryQuantity
    },
    {}
  )

  // console.log(JSON.stringify(categoriesQuantity))
  // console.log(JSON.stringify(Object.keys(categoriesQuantity)))
  // console.log(JSON.stringify(Object.values(categoriesQuantity)))

  const sortedCategories = Object.keys(categoriesQuantity).sort((a, b) => categoriesQuantity[b] - categoriesQuantity[a])
  document.querySelector('.spots-categories-info').innerHTML = `
  <hr>
  <p class="info">At the time, the most mappet category is <strong>${sortedCategories[0]}</strong> with a total of <strong>${categoriesQuantity[sortedCategories[0]]}</strong> spots.</p>
  `

  let categoriesData = {
    labels: Object.keys(categoriesQuantity),
    datasets: [
      {
        data: Object.values(categoriesQuantity),
        backgroundColor: [
          '#F88927',
          '#9F3763',
          '#FFD525',
          '#F05A28',
          '#15607A',
          '#1C80A2',
          '#4FBC9F',
          '#48A786',
          '#1EA1CD',
          '#6BF1BC',
          '#FCB55F',
          '#F24438',
          '#C7331F'
        ]
      }
    ]
  }

  let pieChart = new Chart(spotsCategoriesCanvas, {
    type: 'doughnut',
    data: categoriesData,
    options: {
      legend: {
        position: 'bottom',
        labels: {
          fontSize: 12,
          padding: 20
        }
      }
    }
  })
})
