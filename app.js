
const routes = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=sf-muni'
// const predictions = `http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=sf-muni&r="${tagSplit}"&s="${}"&useShortTitles=true`

getBusses();

function getBusses() {
    $.ajax({
        method: "GET",
        url: routes,
        success: displayRoutes,
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
    console.log(globalRoutes)


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

    // for (i=0; i < xmlRoutes.length; i++) {
    //     let stopList = [];
    //     stopList += xmlRoutes[i].getAttribute("stopId");

    //     stopsArr.push(stopList)
    //     console.log(stopList)
    // }
}

function getStopIds(res) {
    console.log(res)
    let xmlStops = res.getElementsByTagName("stop")

    stopsArr.push(xmlStops);
    console.log(stopsArr)

    // for (i=0; i < xmlRoutes.length; i++) {
    //     let stopList = [];
    //     stopList += xmlRoutes[i].getAttribute("stopId");

    //     stopsArr.push(stopList)
    //     console.log(stopList)
    // }
}

// console.log(routesArr)
// console.log(tagsArr)

// THIS WILL DISPLAY AN INDIVIDUAL ROUTE MAP UPON ROUTE SELECT FROM LIST
// function displayMap() {

// }

function handleError(e1, e2, e3) {
    console.log(e1);
    console.log(e2);
    console.log(e3);
}