import { Component, OnInit } from '@angular/core';
import {GithubService} from '../../services/github.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  welcomeMessage:string;

  constructor(public githubService: GithubService) { }

  ngOnInit() {
  //   this.githubService.getRandomSlogan().subscribe((slogan)=>{
  //     console.log(slogan);
  //   this.welcomeMessage = slogan;
  // });
  }

}
