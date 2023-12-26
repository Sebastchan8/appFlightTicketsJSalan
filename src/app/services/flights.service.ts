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

}
