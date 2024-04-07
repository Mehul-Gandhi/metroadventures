"use strict";
// Another file (e.g., App.ts)
Object.defineProperty(exports, "__esModule", { value: true });
var route_1 = require("./route");
var sampleRoute = (0, route_1.createSampleRoute)();
console.log(sampleRoute.toJSON());
var west_portal = (0, route_1.wanderWestPortal)();
//console.log(west_portal.toJSON());
var richmond = (0, route_1.richmondZigZag)();
//console.log(richmond.toJSON())
