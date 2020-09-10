const usersJson = "/admin/data/users";
const spotsJson = "/admin/data/spots";
const petsJson = "/admin/data/pets";

// User graph

axios
  .get(usersJson)
  .then((responseFromAPI) => {
    console.log(responseFromAPI.data);

    let dates = [];
    let numberOfUsers = [];
    responseFromAPI.data.forEach((el) => {
      dates.push(new Date(el.createdAt).toDateString());
    });
    const numberOfDates = dates.reduce((el, date) => {
      el[date] = (el[date] || 0) + 1;
      return el;
    }, {});
    numberOfUsers = Object.values(numberOfDates);

    console.log(dates);
    console.log(numberOfUsers);

    new Chart(document.getElementById("my-chart"), {
      type: "line",
      data: {
        labels: [...new Set(dates)],
        datasets: [
          {
            label: "Number of users",
            borderColor: "#04adbf",
            fill: false,
            data: numberOfUsers,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              },
            },
          ],
        },
        legend: { display: false },
        title: {
          display: true,
          text: "Users per month",
        },
      },
    });
  })
  .catch((err) => console.log("Error while getting the data: ", err));

// Spots & Users graph
axios
  .all([axios.get(usersJson), axios.get(spotsJson)])
  .then(
    axios.spread(function (usersData, spotsData) {
      console.log(usersData.data);
      console.log(spotsData.data);

      let userDates = [];
      let numberOfUsers = [];
      usersData.data.forEach((el) => {
        userDates.push(new Date(el.createdAt).getMonth());
      });
      const numberOfDates = userDates.reduce((el, date) => {
        el[date] = (el[date] || 0) + 1;
        return el;
      }, {});

      numberOfUsers = Object.values(numberOfDates);

      console.log(userDates);
      console.log(numberOfUsers);

      let spotDates = [];
      let numberOfSpots = [];
      spotsData.data.forEach((el) => {
        spotDates.push(new Date(el.createdAt).getMonth());
      });
      const numberOfUserDates = spotDates.reduce((el, date) => {
        el[date] = (el[date] || 0) + 1;
        return el;
      }, {});

      numberOfSpots = Object.values(numberOfUserDates);

      console.log(spotDates);
      console.log(numberOfSpots);

      new Chart(document.getElementById("mix-canvas"), {
        type: "line",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Number of users",
              borderColor: "#04adbf",
              fill: false,
              data: numberOfUsers,
            },
            {
              label: "Number of spots",
              borderColor: "#a0a603",
              fill: false,
              data: numberOfSpots,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  stepSize: 50,
                },
              },
            ],
          },
          legend: { display: false },
          title: {
            display: true,
            text: "Users & Spots per month",
          },
        },
      });
    })
  )
  .catch((err) => console.log("Error while getting the data: ", err));

// Spots & Cities graph

axios.get(spotsJson).then((responseFromAPI) => {
  console.log(responseFromAPI.data);

  let citiesCanvas = document.getElementById("cities-canvas");

  Chart.defaults.global.defaultFontFamily = "Lato";
  Chart.defaults.global.defaultFontSize = 18;

  const dataArray = responseFromAPI.data;

  const allLabelsData = [];
  dataArray.forEach((data) => {
    allLabelsData.push(data.city);
  });

  const citiesQuantity = allLabelsData.reduce((cityQuantity, city) => {
    cityQuantity[city] = (cityQuantity[city] || 0) + 1;
    return cityQuantity;
  }, {});

  console.log(JSON.stringify(Object.keys(citiesQuantity)));

  console.log(JSON.stringify(Object.values(citiesQuantity)));

  let citiesData = {
    labels: Object.keys(citiesQuantity),
    datasets: [
      {
        data: Object.values(citiesQuantity),
        backgroundColor: [
          "#15607A",
          "#1C80A2",
          "#4FBC9F",
          "#48A786",
          "#1EA1CD",
          "#6BF1BC",
          "#FCB55F",
          "#F24438",
          "#C7331F",
          "#F88927",
          "#9F3763",
          "#FFD525",
          "#F05A28",
        ],
      },
    ],
  };

  var pieChart = new Chart(citiesCanvas, {
    type: "pie",
    data: citiesData,
  });
});


// Kind of pets

axios.get(petsJson).then((responseFromAPI) => {
  console.log(responseFromAPI.data);

  let petsCanvas = document.getElementById("pets-canvas");

  Chart.defaults.global.defaultFontFamily = "Lato";
  Chart.defaults.global.defaultFontSize = 18;

  const dataArray = responseFromAPI.data;

  const allLabelsData = [];
  dataArray.forEach((data) => {
    allLabelsData.push(data.animal);
  });

  const petsQuantity = allLabelsData.reduce((petQuantity, pet) => {
    petQuantity[pet] = (petQuantity[pet] || 0) + 1;
    return petQuantity;
  }, {});

  console.log(JSON.stringify(Object.keys(petsQuantity)));

  console.log(JSON.stringify(Object.values(petsQuantity)));

  let petsData = {
    labels: Object.keys(petsQuantity),
    datasets: [
      {
        data: Object.values(petsQuantity),
        backgroundColor: [
          "#F88927",
          "#9F3763",
          "#FFD525",
          "#F05A28",
          "#15607A",
          "#1C80A2",
          "#4FBC9F",
          "#48A786",
          "#1EA1CD",
          "#6BF1BC",
          "#FCB55F",
          "#F24438",
          "#C7331F",
        ],
      },
    ],
  };

  var pieChart = new Chart(petsCanvas, {
    type: "pie",
    data: petsData,
  });
});

// Kind of pets

axios.get(spotsJson).then((responseFromAPI) => {
  console.log(responseFromAPI.data);

  let spotsCategoriesCanvas = document.getElementById("spots-categories-canvas");

  Chart.defaults.global.defaultFontFamily = "Lato";
  Chart.defaults.global.defaultFontSize = 18;

  const dataArray = responseFromAPI.data;

  const allLabelsData = [];
  dataArray.forEach((data) => {
    allLabelsData.push(data.category);
  });

  const categoriesQuantity = allLabelsData.reduce((categoryQuantity, category) => {
    categoryQuantity[category] = (categoryQuantity[category] || 0) + 1;
    return categoryQuantity;
  }, {});

  console.log(JSON.stringify(Object.keys(categoriesQuantity)));

  console.log(JSON.stringify(Object.values(categoriesQuantity)));

  let categoriesData = {
    labels: Object.keys(categoriesQuantity),
    datasets: [
      {
        data: Object.values(categoriesQuantity),
        backgroundColor: [
          "#F88927",
          "#9F3763",
          "#FFD525",
          "#F05A28",
          "#15607A",
          "#1C80A2",
          "#4FBC9F",
          "#48A786",
          "#1EA1CD",
          "#6BF1BC",
          "#FCB55F",
          "#F24438",
          "#C7331F",
        ],
      },
    ],
  };

  var pieChart = new Chart(spotsCategoriesCanvas, {
    type: "pie",
    data: categoriesData,
  });
});
