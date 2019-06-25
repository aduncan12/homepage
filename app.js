
// MUNI API
const routes = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=sf-muni'
const stops = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=sf-muni'
const predictions = `http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=sf-muni&r="N"&s="5205"&useShortTitles=true`

// Weather API
const weather = 'https://api.weather.gov/gridpoints/MTR/87,126/forecast';


// getTime();
// getWeather();
getBusses();
getStops();

function getTime() {
    let dateAll = new Date();
    let hour = dateAll.getHours();
    let minutes = dateAll.getMinutes();
    let seconds = dateAll.getSeconds();
    let date = dateAll.getDate();
    let year = dateAll.getFullYear();

    if (hour > 12) {
        let fullTime = hour-12 + ':' + (minutes < 10 ? '0':'') + minutes + ':' + (seconds < 10 ? '0':'') + seconds + 'pm';
        $('#time').empty(fullTime)
        $('#time').append(fullTime)
    } else if (hour == 0) {
        let fullTime = hour+12 + ':' + (minutes < 10 ? '0':'') + minutes + ':' + (seconds < 10 ? '0':'') + seconds + 'am';
        $('#time').empty(fullTime)
        $('#time').append(fullTime)
    } else if (hour == 12) {
        let fullTime = hour + ':' + (minutes < 10 ? '0':'') + minutes + ':' + (seconds < 10 ? '0':'') + seconds + 'pm';
        $('#time').empty(fullTime)
        $('#time').append(fullTime)
    } else {
        let fullTime = hour + ':' + (minutes < 10 ? '0':'') + minutes + ':' + (seconds < 10 ? '0':'') + seconds + 'am';
        $('#time').empty(fullTime)
        $('#time').append(fullTime)
    }
    
    let day = new Array(7);
        day[0] = "Sunday";
        day[1] = "Monday";
        day[2] = "Tuesday";
        day[3] = "Wednesday";
        day[4] = "Thursday";
        day[5] = "Friday";
        day[6] = "Saturday";
    let weekday = day[dateAll.getDay()];

    let month = new Array(12);
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
    let monthName = month[dateAll.getMonth()];

    $('#day').empty(weekday)
    $('#day').append(weekday)

    $('#month').empty(monthName)
    $('#month').append(monthName)

    $('#date').empty(date)
    $('#date').append(date)

    $('#year').empty(year)
    $('#year').append(year)
}

function getWeather() {
    $.ajax({
        method: "GET",
        url: weather,
        success: displayWeather,
        error: handleError
    })
}

function displayWeather(res) {
    let forecast = res.properties.periods
    console.log(forecast)

    $('#weather0').empty();
    $('#weather0').append(forecast[0].name + ": " + forecast[0].detailedForecast);
    $('#weather1').empty();
    $('#weather1').append(forecast[1].name + ": " + forecast[1].detailedForecast);
    $('#weather2').empty();
    $('#weather2').append(forecast[2].name + ": " + forecast[2].detailedForecast);
}

function getBusses() {
    $.ajax({
        method: "GET",
        url: routes,
        success: displayRoutes,
        error: handleError
    })
}

function getStops() {
    $.ajax({
        method: "GET",
        url: stops,
        success: getStopIds,
        error: handleError
    })
}

// function stopPredict() {
//     $.ajax({
//         method: "GET",
//         url: predictions,
//         success: getPredict,
//         error: handleErrors
//     })
// }

// function getPredict(res) {
//     console.log(res)
// }

let globalRoutes = [];
let globalTags = [];
let stopsArr = [];

let routesArr = [];
let tagsArr = [];

let myGlobalRoutes = [];

function displayRoutes(res) {

    let xmlRoutes = res.getElementsByTagName("route");

    globalRoutes.push(xmlRoutes);

    for (i=0; i < xmlRoutes.length; i++) {
        let routeList = [];
        routeList += xmlRoutes[i].getAttribute("title");
        routesArr.push(routeList)
    }

    let myRoutes = [];
    for (let i = 0; i < routesArr.length; i++) {

        if (routesArr[i] == "5-Fulton" || routesArr[i] == "5R-Fulton Rapid" || routesArr[i] == "6-Haight-Parnassus" || routesArr[i] == "7-Haight-Noriega" || routesArr[i] == "21-Hayes" || routesArr[i] == "22-Fillmore" ||routesArr[i] == "24-Divisadero" || routesArr[i] == "31-Balboa" || routesArr[i] == "38-Geary" || routesArr[i] == "38R-Geary Rapid" ||routesArr[i] == "43-Masonic")
            myRoutes.push(routesArr[i]);            
        }

        myGlobalRoutes.push(myRoutes)

        for(let i = 0; i < myRoutes.length; i++) {
            let display = `<p><a class="routeLink" href="" id=${myRoutes[i]}>${myRoutes[i]}</a></p>`;
            $('.routes').append(display)
        }

    getRouteTag();
}

function getRouteTag() {
    let tags = globalRoutes[0];

    globalTags.push(tags);

    for(i=0; i < tags.length; i++) {
        let routeTag = [];
        routeTag += tags[i].getAttribute("tag");        
        tagsArr.push(routeTag)
    }

//separates route tag from route link
    $('.routeLink').on('click', function(e) {
        e.preventDefault();
        let tagFromRoute = e.target.id
        splitRoute = tagFromRoute.split('-')
        tagSplit = splitRoute[0]
        console.log(tagSplit)
    })
}

function getStopIds(res) {
    console.log(res)
    let xmlStops = res.getElementsByTagName("stop")

    stopsArr.push(xmlStops);
    console.log(stopsArr)

    for (i=0; i < xmlStops.length; i++) {
        let stopList = [];
        stopList += xmlStops[i].getAttribute("stopId");

        stopsArr.push(stopList)
    }
}


// THIS WILL DISPLAY AN INDIVIDUAL ROUTE MAP UPON ROUTE SELECT FROM LIST
// function displayMap() {

// }

function handleError(e1, e2, e3) {
    console.log(e1);
    console.log(e2);
    console.log(e3);
}


