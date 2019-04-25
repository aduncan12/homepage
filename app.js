
// MUNI API
const routes = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=sf-muni'
const stops = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=sf-muni'
// const predictions = `http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=sf-muni&r="${tagSplit}"&s="${}"&useShortTitles=true`


// Weather API
// const weather = 'https://api.weather.gov/gridpoints/mtr/37.777888,-122.436825';
const weather = 'https://api.weather.gov/gridpoints/MTR/87,126/';

getBusses();
getStops();
getWeather();



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

// let date = new Date();
// let hour = date.getHours();
// console.log(hour)

function getWeather() {
    $.ajax({
        method: "GET",
        url: weather,
        success: displayWeather,
        error: handleError
    })
}

function displayWeather(res) {
    console.log(res)
    let forecast = res.properties.temperature.values

    console.log(forecast)

    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();

    console.log(hour + ':' + (minutes<10?'0':'') + minutes);

    for (i=0; i < forecast.length; i++) {
        let temperature = [];
        let forecastTime = [];
        temperature += forecast[i].value;
        forecastTime += forecast[i].validTime;

        // if(forecastTime > hour) {
        //     console.log(forecastTime)
        // }

        // console.log(temperature)

    }
}

function handleError(e1, e2, e3) {
    console.log(e1);
    console.log(e2);
    console.log(e3);
}


