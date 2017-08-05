import { Component, OnInit } from '@angular/core';
import {GithubService} from '../../services/github.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    searchName:string;
  constructor(public githubService: GithubService) { }

  ngOnInit() {
  }

  search(name){
    this.githubService.getUser(name).subscribe(result =>{
      console.log(result);
    });
  }
}
