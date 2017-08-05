import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';

import {FakeJsonDataService} from './services/fake-json-data.service';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

const appRoutes: Routes = [
  {
    path:'', component:UserComponent
  },
  {
    path:'about', component:AboutComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [FakeJsonDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
