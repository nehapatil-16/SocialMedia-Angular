import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignInPageComponent } from '../components/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from '../components/sign-up-page/sign-up-page.component';


const routes: Routes = [
];

@NgModule({
    declarations: [
        SignInPageComponent,
        SignUpPageComponent
      ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
],
    providers: [
        provideClientHydration()
      ],

  exports: [
    RouterModule,
    SignInPageComponent,
    SignUpPageComponent
  ],
    
})

export class loginModule { }
