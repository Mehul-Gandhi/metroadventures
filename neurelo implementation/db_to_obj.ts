import { Coordinates, Clue, POI, Rating } from './route';
import { Poi, PoiApiService, neureloConfig } from 'neurelo-sdk';
neureloConfig.apiKey = "neurelo_9wKFBp874Z5xFw6ZCfvhXd/w9y5gCGya0vcRosG0+ZfNzmDp39N2GbkikCb6aDXtKC0wzoq+giwupk1xbS+HnbWh5pT61gJdKXfSlu3/A1oBS9Tr1VhtEb91of9u3RQ4rEcnc8RbWwee5irb6AUXV/by6NJ50ecXv4e1SuD3flLHZLXSSGWGU7k9L8e7y0wG_rmTVCKyIo/JfefNQ2KMv8hBzZJb1kHQd1bXw0E+ebtQ=";
interface poiJsonObject {
    latitude: number;
    longitude: number;
    clue1: string;
    clue2: string;
    clue3: string;
    description: string;
    name: string;
  }


function json_to_poi(json : poiJsonObject){
    const location: Coordinates = new Coordinates(json.latitude, json.longitude);
    const clues: Clue[] = [new Clue(json.clue1), new Clue(json.clue2), new Clue(json.clue3)];
    const poi: POI = new POI(json.description, json.name, location, clues);
    return poi;
}

const found = PoiApiService.findPoiById("66120a5b48a1607e01b1f688");
console.log(found.data);
  
