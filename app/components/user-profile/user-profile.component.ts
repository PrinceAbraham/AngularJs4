import { Component, OnInit } from '@angular/core';
import {GithubService} from '../../services/github.service';
import {CanActivate, Router, ActivatedRoute, RouterStateSnapshot, 
  CanActivateChild, NavigationExtras} from '@angular/router';
import _ from "lodash";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  sub:any;
  loginName:string;
  userDetails:any;
  repoDetails:any;
  topThreeLanguages:string[] = [];
  groupsOfLanguages:string[] = [];
  mostWatchedRepo:any;

  constructor(private activeRoute: ActivatedRoute, 
    private githubService: GithubService) {

  }

  ngOnInit() {
    this.userDetails = {};
    this.sub = this.activeRoute.params.subscribe(params =>{
      this.loginName = params.name;
      this.githubService.getUser(this.loginName).subscribe(res =>{
          this.userDetails = res;
          //Atleast one public repo
          if(this.userDetails.public_repos > 0){
              this.githubService.getRepositories(this.loginName).subscribe(res => {
                this.repoDetails = res;
                this.topThreeLanguages = this.getTopThreeLanguages(this.repoDetails);
                this.mostWatchedRepo = this.getMostWatchedRepo(this.repoDetails);
              });
          }
      });
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  getTopThreeLanguages(repo){
    let languages = _.groupBy(repo, 'language');
    let threeLanguages = [];
    let allLanguages = [];
    if(languages['null']){
        delete languages['null'];
    }
    
    for(let language in languages){
      languages[language] = languages[language].length;
      allLanguages.push(language);
    }
    this.groupsOfLanguages = allLanguages;
    console.log(this.groupsOfLanguages);
    let topNumbers = _.sortBy(languages, [function(o){return -o;}]);
    for(let key in languages){
      var value = languages[key];
      if(topNumbers[0] == value && value > 3){
        threeLanguages[0] = key;
      }
      if(topNumbers[1] == value && value > 3){
        threeLanguages[1] = key;
      }
      if(topNumbers[2] == value && value > 3){
        threeLanguages[2] = key;
      }
    }
      return threeLanguages;
  }
  
  getMostWatchedRepo(repo){
    let mostWatch = 0;
    let repoToSend;
    for(let i = 0; i < repo.length; i++){
        if(repo[i].watchers > mostWatch){
          mostWatch = repo[i].watchers;
          repoToSend = repo[i];
        }
    }
      return repoToSend;
  }
}