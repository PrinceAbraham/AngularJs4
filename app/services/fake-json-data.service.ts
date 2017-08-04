import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FakeJsonDataService {

  constructor(public http: Http) {
    console.log('FakeJsonDataService');
  }

  getPosts(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
    .map(res => res.json());
  }
}
