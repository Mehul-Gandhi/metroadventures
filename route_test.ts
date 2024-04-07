// Another file (e.g., App.ts)

import { Route, createSampleRoute, richmondZigZag, wanderWestPortal } from './route';
import { Poi } from 'neurelo-sdk';
const sampleRoute: Route = createSampleRoute();
console.log(sampleRoute.toJSON());

const west_portal :Route = wanderWestPortal();
//console.log(west_portal.toJSON());

const richmond : Route = richmondZigZag();
//console.log(richmond.toJSON())