import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GithubService {

  public searchResults:any;

  url:string = 'https://api.github.com/';

  constructor(public http: Http) { }

  getRandomSlogan(){
    return this.http.get(this.url+'zen')
    .map(res => res.text());
  }

  searchUser(name){
    return this.http.get(this.url+'search/users?q='+ name)
    .map(res => res.json());
  }

  getUser(name){
    return this.http.get(this.url+'users/'+name)
    .map(res => res.json());
  }

  getRepositories(name){
      return this.http.get(this.url+'users/'+name+'/repos')
    .map(res => res.json());
  }

}
