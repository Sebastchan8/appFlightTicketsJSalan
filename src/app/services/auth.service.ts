import { Injectable } from '@angular/core';
import { FlightsService } from './flights.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated!: boolean
  private userType!: string
  private user!: number

  private filter!:any

  constructor() {}

  login(type:string, currentUser:number) {
    this.isAuthenticated = true
    this.userType = type
    this.user = currentUser
  }

  logout(): void {
    this.isAuthenticated = false
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated
  }

  type(): string {
    return this.userType
  }

  currentUser(): number {
    return this.user
  }

  setFilter(filter:any){
    this.filter = filter
  }

  getFilter(){
    return this.filter
  }
}
