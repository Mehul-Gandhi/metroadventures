"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSampleRoute = exports.Route = exports.Rating = exports.POI = exports.Clue = exports.Coordinates = void 0;
var ROSS_ALLEY_DIRECTORY = "assets/images/ggfcf_rossalley.jpg";
var CITY_LIGHTS_DIRECTORY = "assets/images/citylight_alleywaymural.jpg";
// Route class in TypeScript
var Coordinates = /** @class */ (function () {
    function Coordinates(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude; // Fixed typo in property name
    }
    Coordinates.prototype.toJSON = function () {
        return {
            latitude: this.latitude,
            longitude: this.longitude
        };
    };
    return Coordinates;
}());
exports.Coordinates = Coordinates;
var Clue = /** @class */ (function () {
    function Clue(text, imageDirectory) {
        if (imageDirectory === void 0) { imageDirectory = ''; }
        this.text = text;
        this.imageDirectory = imageDirectory;
    }
    Object.defineProperty(Clue.prototype, "hasImage", {
        get: function () {
            return this.imageDirectory !== '';
        },
        enumerable: false,
        configurable: true
    });
    Clue.prototype.toJSON = function () {
        return {
            text: this.text,
            imageDirectory: this.imageDirectory
        };
    };
    return Clue;
}());
exports.Clue = Clue;
var POI = /** @class */ (function () {
    function POI(description, name, location, clues) {
        if (clues === void 0) { clues = []; }
        this.description = description;
        this.name = name;
        this.location = location;
        this.clues = clues;
    }
    POI.prototype.toJSON = function () {
        return {
            description: this.description,
            name: this.name,
            location: { create: this.location.toJSON() },
            clues: { createMany: this.clues.map(function (clue) { return clue.toJSON(); }) }
        };
    };
    return POI;
}());
exports.POI = POI;
var Rating = /** @class */ (function () {
    function Rating(score, numberOfRatings) {
        this.score = score;
        this.numberOfRatings = numberOfRatings;
    }
    Rating.prototype.toJSON = function () {
        return {
            score: this.score,
            numberOfRatings: this.numberOfRatings
        };
    };
    return Rating;
}());
exports.Rating = Rating;
var Route = /** @class */ (function () {
    function Route(name, estimatedTime, transportationMethod, description, rating, pois, address) {
        this.name = name;
        this.estimatedTime = estimatedTime;
        this.transportationMethod = transportationMethod;
        this.description = description;
        this.rating = rating;
        this.pois = pois;
        this.address = address;
    }
    Route.prototype.toJSON = function () {
        return JSON.stringify({
            name: this.name,
            estimatedTime: this.estimatedTime,
            transportationMethod: this.transportationMethod,
            description: this.description,
            rating: { create: this.rating.toJSON() },
            pois: { createMany: this.pois.map(function (poi) { return poi.toJSON(); }) },
            address: this.address
        });
    };
    return Route;
}());
exports.Route = Route;
// Example of creating a new Route instance
function createSampleRoute() {
    var clues1 = [new Clue("This location holds the history and heritage of the Chinese residents of San Francisco, with thousands of their stories inside. "),
        new Clue("\"Perfect place to get some work done. Warm in winter and there's usually desks available. Great collection of DVDs, if you still have a player.\" Five stars."),
        new Clue("The building stands out as one of the few brick buildings in all of Chinatown.")
    ];
    var poi1 = new POI("Find a book in Chinese and translate the title to see what you're reading.", "Chinatown Library", new Coordinates(37.79575, -122.40729), clues1);
    var clues2 = [
        new Clue("This place makes a staple of American Chinese restaurants by hand, despite the fact that the Chinese did not invent this particular treat."),
        new Clue("Insert image of Ross Alley here", ROSS_ALLEY_DIRECTORY),
        new Clue("Good fortunes will follow you when you walk between Stockton and  Grant!")
    ];
    var poi2 = new POI("Walk inside and see how many celebrities you recognize on the walls. Also, grab a free sample of the fortune cookies if the workers offer; they're simply the best when they're fresh.", "Golden Gate Fortune Cookie Factory", new Coordinates(37.79575, -122.40729), clues2);
    var clues3 = [
        new Clue("This was the first business to be declared a historical landmark by the city of San Francisco, thanks to its outsized influence on the literary arts of the city."),
        new Clue("Picture of the mural on the side of the building in that alleyway", CITY_LIGHTS_DIRECTORY),
        new Clue("The shop faces one of the few triangular bits of San Francisco; look for it across from the spot flanked by Columbus, Broadway, and Kearny.")
    ];
    var poi3 = new POI("Ask the person at the register for a book recommendation, then go take a selfie with it.", "City Lights", new Coordinates(37.79763, -122.40657), clues3);
    var clues4 = [
        new Clue("Don't point fingers at this place, it can do that for itself just fine."),
        new Clue("The name of this great hole-in-the-wall restaurant is reminiscent of the Oscar award."),
        new Clue("The pizza joint is named after one color but located on a street named another. The Golden Boy is on Green Street.")
    ];
    var poi4 = new POI("Go check out the ridiculous number of stickers decorating the location. Take a picture of your favorite, and add your own if you can.", "Golden Boy Pizza", new Coordinates(37.79965, -122.40809), clues4);
    var clues5 = [
        new Clue("One Nation('s first leader) Under (the house of) God."),
        new Clue("\"Its bells toll for all souls ; I hear them in my apartment. And I can see its lovely architecture bathed in colorful light in the evening.\" Five stars."),
        new Clue("It's impossible to miss the spires of this building from across Columbus Avenue. The beautiful arcitecture towers over North Beach.")
    ];
    var poi5 = new POI("Quietly and respectfully, enter the church to admire the beautiful stained glass and statues decorating the impressive interior.", "Saints Peter and Paul Church", new Coordinates(37.80137, -122.41020), clues5);
    var routeRating = new Rating(4.8, 150);
    var route_description = "Come for a walk in two of San Francisco's most iconic neighborhoods: North Beach and Chinatown! Here, you'll explore some of the hidden gems of this part of town, meeting the people who have kept this city running for decades.";
    var route_starting_address = "943 Stockton St, San Francisco, CA 94108";
    return new Route("Columbus Corridor", 1.5, "Walking", route_description, routeRating, [poi1, poi2, poi3, poi4, poi5], route_starting_address);
}
exports.createSampleRoute = createSampleRoute;
//const test_route: Route = createSampleRoute();
//console.log(test_route.toJSON());
