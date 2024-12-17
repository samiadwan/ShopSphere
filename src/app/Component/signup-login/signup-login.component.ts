import { CommonModule, DOCUMENT, JsonPipe } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import { ProductComponent } from '../product/product.component';
import { HttpClient, HttpClientModule ,provideHttpClient,withFetch } from '@angular/common/http';
import { LoginModel, SignUpModel } from '../../Model/class';
import { MixpanelService } from '../../Shared/Services/mixpanel.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup-login',
  standalone: true,
  imports: [CommonModule, FormsModule, JsonPipe,ProductComponent],
  // encapsulation: ViewEncapsulation.None,
  templateUrl: './signup-login.component.html',
  styleUrl: './signup-login.component.css'
})
export class SignupLoginComponent implements OnInit{

  isSignDivVisiable: boolean = true;
  signUpobj : SignUpModel = new SignUpModel();
  loginobj : LoginModel = new LoginModel();
  anonymousId: string = "";

  constructor(
    private router: Router,
    private mixpanelService: MixpanelService,
    private toastr: ToastrService
  ){}
  ngOnInit(): void {
    this.anonymousId = localStorage.getItem('anonymousId') || this.generateAnonymousId();
    debugger;
    if (!localStorage.getItem('anonymousId')) {
      localStorage.setItem('anonymousId', this.anonymousId);
    }
    this.mixpanelService.trackEvent('Page View', { user_id: this.anonymousId });
  }
  generateAnonymousId(): string {
    return 'sd_' + Math.random().toString(36).substr(2, 9);
  }
  
  showSuccess() {
    this.toastr.success('Registration Success', 'Toastr fun!', {
      positionClass: 'toast-top-center'});
  }
  onRegister(){
   
    const localUser = localStorage.getItem('trackpanel18users');
    if(localUser !=null){
      const users = JSON.parse(localUser);
      users.push(this.signUpobj);
      this.mixpanelService.trackEvent('SignUp', { email: this.signUpobj.email });
      // localStorage.setItem('trackpanel18users', JSON.stringify(users));
    }else{
       const users = [];
       users.push(this.signUpobj);
       this.mixpanelService.trackEvent('SignUp', { email: this.signUpobj.email });
      //  localStorage.setItem('trackpanel18users', JSON.stringify(users));
    }
    this.toastr.success('Registration Success');
    this.showSuccess();
    const localUserref = localStorage.getItem('trackpanel18users');
    if(localUserref != null){
      const users = JSON.parse(localUserref);
      const isUserPresent = users.find((user:SignUpModel)=> user.email == this.signUpobj.email && user.password == this.signUpobj.password)
       if(isUserPresent != undefined)
       {
        this.mixpanelService.identifyUser(this.signUpobj.email, isUserPresent.name);
        
        this.mixpanelService.setIdentity(this.signUpobj.email,
          {
            '$name': `${this.signUpobj.name} `,
            '$email': this.signUpobj.email
          });
        this.mixpanelService.trackEvent('Login', { email: this.signUpobj.email, eventType: 'Signup' });
        localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
        this.toastr.success('Registration Success');
        this.router.navigate(['/products']);
       }else{
        alert("No user forund");
       }
     
    }
  }
  onLogin(){
    alert('signin')

    const localUser = localStorage.getItem('trackpanel18users');
    if(localUser != null){
      const users = JSON.parse(localUser);
      const isUserPresent = users.find((user:SignUpModel)=> user.email == this.loginobj.email && user.password == this.loginobj.password)
       if(isUserPresent != undefined)
       {
        debugger;
        this.mixpanelService.identifyUser(this.loginobj.email, isUserPresent.name);
        this.mixpanelService.trackEvent('Login', { email: this.loginobj.email, eventType: 'login' });
        localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
        this.isSignDivVisiable = false;
        this.toastr.success('Login Success');
        this.showSuccess();
        this.router.navigate(['/products']);
 
       }else{
        alert("No user forund");
       }
     
    }
  }
  
}


