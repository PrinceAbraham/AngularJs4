import { Component, OnInit } from '@angular/core';
import {GithubService} from '../../services/github.service';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, 
  CanActivateChild, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    searchName:string;
  constructor(public githubService: GithubService, private router: Router) { }

  ngOnInit() {
  }

  search(name){
    this.githubService.searchUser(encodeURIComponent(name)).subscribe(result =>{
      console.log(result);
      this.githubService.searchResults = result.items;
      this.router.navigate(['/users', encodeURIComponent(name)]);
    });
  }
}
