import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GithubService {

  url:string = 'https://api.github.com/';

  constructor(public http: Http) { }

  getRandomSlogan(){
    return this.http.get(this.url+'zen')
    .map(res => res.text());
  }

  getUser(name){
    return this.http.get(this.url+'users/'+name)
    .map(res => res.json());
  }

}
