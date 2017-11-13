import { Http, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Location } from "../models/location";
import * as L from "leaflet";
import "rxjs/add/operator/map";

@Injectable()
export class GeocodingService {

  constructor(public http: Http) {}

  geocode(address: string) {
    return this.http
      .get("https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(address) + "&key=AIzaSyDCflB_l_yiXG9F29g65Q33boBrCJTepmM")
      .map(res => res.json())
      .map(result => {
        console.log(result);
        if (result.status !== "OK") { throw new Error("Unable to geocode address"); }
          let location = new Location();
          //location.address = result.results[0].formatted_address;
          location.latitude = result.results[0].geometry.location.lat;
          location.longitude = result.results[0].geometry.location.lng;
          console.log(location)
          /*let viewPort = result.results[0].geometry.viewport;
          location.viewBounds = L.latLngBounds(
          {
            lat: viewPort.southwest.lat,
            lng: viewPort.southwest.lng
          },
          {
            lat: viewPort.northeast.lat,
            lng: viewPort.northeast.lng
          });*/

          return location;
      });
  }
}
