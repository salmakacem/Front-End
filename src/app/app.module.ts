
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreloaderComponent } from './components/layouts/preloader/preloader.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { HomeOneComponent } from './components/pages/home-one/home-one.component';
import { HomeTwoComponent } from './components/pages/home-two/home-two.component';
import { HomeThreeComponent } from './components/pages/home-three/home-three.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ServiceComponent } from './components/pages/service/service.component';
import { ServiceTwoComponent } from './components/pages/service-two/service-two.component';
import { ServiceThreeComponent } from './components/pages/service-three/service-three.component';
import { ServiceDetailsComponent } from './components/pages/service-details/service-details.component';
import { BlogRightSidebarComponent } from './components/pages/blog-right-sidebar/blog-right-sidebar.component';
import { PricingComponent } from './components/pages/pricing/pricing.component';
import { RecentProjectComponent } from './components/pages/recent-project/recent-project.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { TeamComponent } from './components/pages/team/team.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { DetailsComponent } from './components/pages/details/details.component';
import { AdresseComponent } from './components/pages/adresse/adresse.component';
import { DashbordComponent } from './dash/dashbord/dashbord.component';
import { ProfileComponent } from './dash/profile/profile.component';
import { GestionadherentsComponent } from './dash/gestionadherents/gestionadherents.component';
import { GestioneventComponent } from './dash/gestionevent/gestionevent.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfileeComponent } from './Adhèrents/profilee/profilee.component';
import { ToastrModule } from 'ngx-toastr';
import { ForgotloginComponent } from './components/pages/forgotlogin/forgotlogin.component';
import { ChangermdpComponent } from './components/pages/changermdp/changermdp.component';
import { ChatComponent } from './components/pages/chat/chat.component';


import { ValidercodeComponent } from './validercode/validercode.component';




@NgModule({
  declarations: [
    AppComponent,
    PreloaderComponent,
    HeaderComponent,
    FooterComponent,
    HomeOneComponent,
    HomeTwoComponent,
    HomeThreeComponent,
    AboutComponent,
    ServiceComponent,
    ServiceTwoComponent,
    ServiceThreeComponent,
    ServiceDetailsComponent,
    BlogRightSidebarComponent,
    PricingComponent,
    RecentProjectComponent,
    ErrorComponent,
    TeamComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    DetailsComponent,
    AdresseComponent,
    DashbordComponent,
    ProfileComponent,
    GestionadherentsComponent,
    GestioneventComponent,
    ProfileeComponent,
    ForgotloginComponent,
    ChangermdpComponent,
    ProfileeComponent,
    ChatComponent,
    ValidercodeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    
    
    
  

  ],
  //providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
