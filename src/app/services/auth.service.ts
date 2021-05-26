import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { userI } from '../models/user.interface';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { auth } from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged : any = false;

  constructor( private router : Router, public afAuth : AngularFireAuth, private gPlus : GooglePlus, private fb : Facebook, public platform : Platform) {
    afAuth.authState.subscribe( user => (this.isLogged = user));
   }

   //Login
   async Login( user: userI){
    try {
      return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      console.log('Error al iniciar Sesion', error);
    }
   }

   //Register
   async Register( user : userI ){
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      console.log('Error al hacer el registro', error)
    }
   }

   getUserAuth(){
     return this.afAuth.authState;
   }

   loginWithGoogle(){
    if (this.platform.is('cordova')){
      return this.gPlus.login({}).then( res => {
        const user = res;
  
        return this.afAuth.auth.signInWithCredential(auth.GoogleAuthProvider.credential(null, user.accessToken));
      })
    }else{
      return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider);
    }
    
   }

   loginWithFacebook(){
    if (this.platform.is('cordova')){
      return this.fb.login(['email', 'public_profile']).then( (res : FacebookLoginResponse) => {
        const credential_fb = auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return this.afAuth.auth.signInWithCredential(credential_fb);
      })
    }else {
      return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider);
    }
    
   }
   
   logout(){
     this.afAuth.auth.signOut().then(() => {
       this.gPlus.disconnect();
       this.router.navigate(['/login']);
     })
   }

   ResetPassword(email :string){
    return this.afAuth.auth.sendPasswordResetEmail(email);
   }
}
