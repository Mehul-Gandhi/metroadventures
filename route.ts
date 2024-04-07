const ROSS_ALLEY_DIRECTORY: string = "assets/images/ggfcf_rossalley.jpg";
const CITY_LIGHTS_DIRECTORY: string = "assets/images/citylight_alleywaymural.jpg";

// Route class in TypeScript
export class Coordinates {
  latitude: number;
  longitude: number; // Fixed typo in property name

  constructor(latitude: number, longitude: number){
    this.latitude = latitude;
    this.longitude = longitude; // Fixed typo in property name
  }

  toJSON() {
    return {
      latitude: this.latitude,
      longitude: this.longitude
    };
  }
}

export class Clue {
  text: string;
  imageDirectory: string;

  constructor(text: string, imageDirectory: string = '') {
    this.text = text;
    this.imageDirectory = imageDirectory;
  }

  get hasImage(): boolean {
    return this.imageDirectory !== '';
  }

  toJSON() {
    return {
      text: this.text,
      imageDirectory: this.imageDirectory
    };
  }
}

export class POI {
  description: string;
  name: string;
  location: Coordinates;
  clues: Clue[];

  constructor(description: string, name: string, location: Coordinates, clues: Clue[] = []) {
    this.description = description;
    this.name = name;
    this.location = location;
    this.clues = clues;
  }

  toJSON() {
    return {
      description: this.description,
      name: this.name,
      location: {create : this.location.toJSON()},
      clues: {createMany : this.clues.map(clue => clue.toJSON())}
    };
  }
}

export class Rating {
  score: number;
  numberOfRatings: number;

  constructor(score: number, numberOfRatings: number) {
    this.score = score;
    this.numberOfRatings = numberOfRatings;
  }

  toJSON() {
    return {
      score: this.score,
      numberOfRatings: this.numberOfRatings
    };
  }
}

export class Route {
  name: string;
  estimatedTime: number;
  transportationMethod: string;
  description: string;
  rating: Rating;
  pois: POI[];
  address: string;

  constructor(name: string, estimatedTime: number, transportationMethod: string, description: string, rating: Rating, pois: POI[], address: string) {
    this.name = name;
    this.estimatedTime = estimatedTime;
    this.transportationMethod = transportationMethod;
    this.description = description;
    this.rating = rating;
    this.pois = pois;
    this.address = address;
  }

  toJSON() {
    return JSON.stringify({
      name: this.name,
      estimatedTime: this.estimatedTime,
      transportationMethod: this.transportationMethod,
      description: this.description,
      rating: {create: this.rating.toJSON()},
      pois: {createMany : this.pois.map(poi => poi.toJSON())},
      address: this.address
    });
  }
}


// Example of creating a new Route instance
export function createSampleRoute(): Route {
  const clues1: Clue[] = [new Clue("This location holds the history and heritage of the Chinese residents of San Francisco, with thousands of their stories inside. "),
      new Clue("\"Perfect place to get some work done. Warm in winter and there's usually desks available. Great collection of DVDs, if you still have a player.\" Five stars."),
      new Clue("The building stands out as one of the few brick buildings in all of Chinatown.")
  ];
  const poi1: POI = new POI("Find a book in Chinese and translate the title to see what you're reading."
      , "Chinatown Library", new Coordinates(37.79575, -122.40729), clues1);

  const clues2: Clue[] = [
        new Clue("This place makes a staple of American Chinese restaurants by hand, despite the fact that the Chinese did not invent this particular treat."),
        new Clue("Insert image of Ross Alley here", ROSS_ALLEY_DIRECTORY),
        new Clue("Good fortunes will follow you when you walk between Stockton and  Grant!")
  ];
  const poi2 : POI = new POI("Walk inside and see how many celebrities you recognize on the walls. Also, grab a free sample of the fortune cookies if the workers offer; they're simply the best when they're fresh."
      , "Golden Gate Fortune Cookie Factory", new Coordinates(37.79575, -122.40729), clues2);

  const clues3: Clue[] = [
      new Clue("This was the first business to be declared a historical landmark by the city of San Francisco, thanks to its outsized influence on the literary arts of the city."),
      new Clue("Picture of the mural on the side of the building in that alleyway",  CITY_LIGHTS_DIRECTORY),
      new Clue("The shop faces one of the few triangular bits of San Francisco; look for it across from the spot flanked by Columbus, Broadway, and Kearny.")
  ];
  const poi3: POI = new POI("Ask the person at the register for a book recommendation, then go take a selfie with it.",
      "City Lights", new Coordinates(37.79763, -122.40657), clues3);

  const clues4: Clue[] = [
      new Clue("Don't point fingers at this place, it can do that for itself just fine."),
      new Clue("The name of this great hole-in-the-wall restaurant is reminiscent of the Oscar award."),
      new Clue("The pizza joint is named after one color but located on a street named another. The Golden Boy is on Green Street.")
  ];
  const poi4: POI = new POI("Go check out the ridiculous number of stickers decorating the location. Take a picture of your favorite, and add your own if you can.",
      "Golden Boy Pizza", new Coordinates(37.79965, -122.40809), clues4);

  const clues5 : Clue[] = [
      new Clue("One Nation('s first leader) Under (the house of) God."),
      new Clue("\"Its bells toll for all souls ; I hear them in my apartment. And I can see its lovely architecture bathed in colorful light in the evening.\" Five stars."),
      new Clue("It's impossible to miss the spires of this building from across Columbus Avenue. The beautiful arcitecture towers over North Beach.")
  ];

  const poi5 : POI = new POI("Quietly and respectfully, enter the church to admire the beautiful stained glass and statues decorating the impressive interior.",
      "Saints Peter and Paul Church", new Coordinates(37.80137, -122.41020), clues5);

  const routeRating = new Rating(4.8, 150);
  const route_description: string = "Come for a walk in two of San Francisco's most iconic neighborhoods: North Beach and Chinatown! Here, you'll explore some of the hidden gems of this part of town, meeting the people who have kept this city running for decades.";
  const route_starting_address = "943 Stockton St, San Francisco, CA 94108";
  return new Route(
    "Columbus Corridor",
    1.5,
    "Walking",
    route_description,
    routeRating,
    [poi1, poi2, poi3, poi4, poi5],
      route_starting_address,
  );
}

//const test_route: Route = createSampleRoute();
//console.log(test_route.toJSON());