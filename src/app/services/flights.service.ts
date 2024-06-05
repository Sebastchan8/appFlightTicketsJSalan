import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  API = "http://localhost:3000/api/interactions/";

  constructor(private http: HttpClient,
    private authService:AuthService) {}


  //*************AUTHENTICATION******** */
  
  login(email:string, password:string){
    return this.http.post(this.API + "login", {email, password})
  }
  
  signup(body:any){
    return this.http.post(this.API + "signup", body)
  }


  //******************FLIGHTS********** */

  getCities(){
    return this.http.get(this.API + 'cities');
  }

  getRecommendedCities(userId: number) {
    return this.http.get(this.API +'recommended-cities/' + userId).pipe(
      map((response: any) => response.cities)
    );
  }

  addCity(city:any){
    return this.http.post(this.API + 'cities', city);
  }

  updateCity(city:any){
    return this.http.put(this.API + 'cities', city);
  }

  deleteCity(city_id:any){
    return this.http.delete(this.API + 'cities/' + city_id);
  }

  getFlight(id:string){
    return this.http.get(this.API + 'flights/' + id);
  }

  getAvailableFlights(filter:any){
    return this.http.post(this.API + 'flights', filter);
  }

  getRoundFlights(id:string){
    return this.http.get(this.API + 'flights/rounded/' + id);
  }

  getNotifications(){
    return this.http.get(this.API + 'notifications/' + this.authService.currentUser());
  }

  getUserData(){
    return this.http.get(this.API + 'user/' + this.authService.currentUser());
  }

  updateUserData(body:any){
    return this.http.put(this.API + 'user/' + this.authService.currentUser(), body);
  }
  
  getUserTickets(){
    return this.http.get(this.API + 'ticket/' + this.authService.currentUser());
  }
  
  getTickets(){
    return this.http.get(this.API + 'flights');
  }
  
  getAerolines(){
    return this.http.get(this.API + 'aerolines');
  }
  
  buyTicket(body:any){
    return this.http.put(this.API + 'ticket/' + this.authService.currentUser(), body);
  }
  
  cancelTicket(ticket_id:number){
    return this.http.delete(this.API + 'ticket/' + ticket_id);
  }

  addFlight(flight:any){
    return this.http.post(this.API + 'flights-crud', flight);
  }

  updateFlight(flight:any){
    return this.http.put(this.API + 'flights-crud', flight);
  }

  deleteFlight(flight_id:any){
    return this.http.delete(this.API + 'flights-crud/' + flight_id);
  }

}
