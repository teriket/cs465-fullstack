import { Inject, Injectable } from '@angular/core';
import {BROWSER_STORAGE} from '../storage';
import {User} from '../models/user';
import {AuthResponse} from '../models/auth-response';
import { TripDataService } from './trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class Authentication {
  //setup storage and service access
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService) { }

  authResp: AuthResponse = new AuthResponse();

  public getToken(): string {
    let out: any;
    out = this.storage.getItem('travlr-token');

    //make sure we return a string even if a token does not exist
    if(!out){
      return '';
    }
    return out;
  }

  public saveToken(token: string): void{
    this.storage.setItem('travlr-token', token);
  }

  public logout(): void{
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if(token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    }
    return false;
  }

  //NOTE this method should only be called after the method isLoggedIn
  public getCurrentUser(): User {
    const token: string = this.getToken();
    const {email, name} = JSON.parse(atob(token.split('.')[1]));
    return {email, name} as User;
  }

  public login(user: User, passwd: string) : void {
    this.tripDataService.login(user, passwd)
      .subscribe({
        next: (value: any) => {
          if(value){
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) => {
          console.log('Error ' + error);
          console.log("error " + user + " " + passwd);
        }
      });  
  }

  public register(user: User, passwd: string) : void {
    this.tripDataService.register(user, passwd)
      .subscribe({
        next: (value: any) => {
          if(value){
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) => {
          console.log('Error ' + error);
        }
      });
  }
}
