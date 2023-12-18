import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  API = "http://localhost:4500/";

  constructor(private http: HttpClient) {}

  getCities(){
    return this.http.get('/assets/data/cities.json');
  }

  getFlight(id:string){
    return this.http.get('/assets/data/flight.json');
  }

  getAvailableFlights(){
    return this.http.get('/assets/data/flights.json');
  }

  getRoundFlights(id:string){
    return this.http.get('/assets/data/flights.json');
  }

  getNotifications(){
    return this.http.get('/assets/data/notifications.json');
  }

  // obtenerCurso(id: string){
  //   return this.http.get(this.API + "/" + id);
  // }

  // insertarCurso(name: string, description: string, duration: string, url: string){
  //   return this.http.post(this.API,{name, description, duration, url});
  // }

  // actualizarCurso(id: string, name: string, description: string, duration: string, url: string){
  //   return this.http.put(this.API + "/" + id, {name, description, duration, url});
  // }

  // eliminarCurso(id: string){
  //   return this.http.delete(this.API + "/" + id);
  // }
}
