"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var route_1 = require("./route");
var neurelo_sdk_1 = require("neurelo-sdk");
neurelo_sdk_1.neureloConfig.apiKey = "neurelo_9wKFBp874Z5xFw6ZCfvhXd/w9y5gCGya0vcRosG0+ZfNzmDp39N2GbkikCb6aDXtKC0wzoq+giwupk1xbS+HnbWh5pT61gJdKXfSlu3/A1oBS9Tr1VhtEb91of9u3RQ4rEcnc8RbWwee5irb6AUXV/by6NJ50ecXv4e1SuD3flLHZLXSSGWGU7k9L8e7y0wG_rmTVCKyIo/JfefNQ2KMv8hBzZJb1kHQd1bXw0E+ebtQ=";
function json_to_poi(json) {
    var location = new route_1.Coordinates(json.latitude, json.longitude);
    var clues = [new route_1.Clue(json.clue1), new route_1.Clue(json.clue2), new route_1.Clue(json.clue3)];
    var poi = new route_1.POI(json.description, json.name, location, clues);
    return poi;
}



