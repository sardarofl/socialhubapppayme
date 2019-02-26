import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {
  // authToken:any;
  // headers= new Headers();

  constructor(private http:Http){  
    // this.authService.RetrieveloadToken();
    
    // this.headers.append('Authorization', this.authService.RetrieveloadToken());
  }

  getData(url){
      return this.http.get(url)
      .map(res => res.json());
    }


}
