import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

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

  logout(){
    return this.http.get(this.API + "logout")
  }
  
  signup(body:any){
    return this.http.post(this.API + "signup", body)
  }


  //******************FLIGHTS********** */

  getCities(){
    return this.http.get(this.API + 'cities');
  }

  //IMPORTANT
  getFlight(id:string){
    return this.http.get('/assets/data/flight.json');
  }

  //IMPORTANT
  getAvailableFlights(){
    return this.http.get('/assets/data/flights.json');
  }

  //IMPORTANT
  getRoundFlights(id:string){
    return this.http.get('/assets/data/flights.json');
  }

  //IMPORTANT
  getNotifications(){
    return this.http.get('/assets/data/notifications.json');
  }

  getUserData(){
    return this.http.get(this.API + 'user/' + this.authService.currentUser());
  }

  updateUserData(body:any){
    return this.http.put(this.API + 'user/' + this.authService.currentUser(), body);
  }

  //IMPORTANT
  getUserTickets(){
    return this.http.get('/assets/data/mytickets.json');
  }

  getTickets(){
    return this.http.get(this.API + 'flights');
  }

  getAerolines(){
    return this.http.get(this.API + 'aerolines');
  }

}
