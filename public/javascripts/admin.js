const usersJson = '/admin/data/users'
const spotsJson = '/admin/data/spots'

// User graph

 axios
   .get(usersJson)
   .then((responseFromAPI) => {
     console.log(responseFromAPI.data)

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

     console.log(dates)
     console.log(numberOfUsers)

     new Chart(document.getElementById('my-chart'), {
       type: 'line',
       data: {
         labels: [...new Set(dates)],
         datasets: [
           {
             label: 'Number of users',
             borderColor: '#04adbf',
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
           text: 'Users per day'
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
       console.log(usersData.data)
       console.log(spotsData.data)

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

       console.log(userDates)
       console.log(numberOfUsers)

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

       console.log(spotDates)
       console.log(numberOfSpots)

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
               borderColor: '#04adbf',
               fill: false,
               data: numberOfUsers
             },
             {
               label: 'Number of spots',
               borderColor: '#a0a603',
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
                   stepSize: 10
                 }
               }
             ]
           },
           legend: { display: false },
           title: {
             display: true,
             text: 'Users & Spots per day'
           }
         }
       })
     })
   )
   .catch((err) => console.log('Error while getting the data: ', err))
