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
  groupsOfLanguages:any = [];

  constructor(private activeRoute: ActivatedRoute, 
    private githubService: GithubService) {

  }

  ngOnInit() {
    this.sub = this.activeRoute.params.subscribe(params =>{
      this.loginName = params.name;
      this.githubService.getUser(this.loginName).subscribe(res =>{
          this.userDetails = res;
          //Atleast one public repo
          if(this.userDetails.public_repos > 0){
              this.githubService.getRepositories(this.loginName).subscribe(res => {
                this.repoDetails = res;
                this.topThreeLanguages = this.getTopThreeLanguages(this.repoDetails);
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
    for(let language in languages){
      languages[language] = languages[language].length;
      if(languages.hasOwnProperty(language)){
        this.groupsOfLanguages.push(language);
      }
    }
    let topNumbers = _.sortBy(languages, [function(o){return -o;}]);
    this.topThreeLanguages.push(_.findKey(languages, topNumbers[0]));
    this.topThreeLanguages.push(_.findKey(languages, topNumbers[1]));
    this.topThreeLanguages.push(_.findKey(languages, topNumbers[2]));
    console.log(this.topThreeLanguages);
      return null;
  }
}
interface popularLanguage{
    name:string;
    count:number;
}