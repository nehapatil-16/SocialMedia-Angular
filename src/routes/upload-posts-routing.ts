import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { UploadPostsComponent } from '../components/upload-posts/upload-posts.component';
// import { AddPostsComponent } from '../components/add-posts/add-posts.component';
import { AddPostsComponent } from '../components/add-posts/add-posts.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { HeaderComponent } from '../components/header/header.component';

const routes: Routes = [
  {
    path:'app-header', 
    component: HeaderComponent,
    children: [
      {
        path:'addposts', component: AddPostsComponent
      },
    ]
  }
  // { path: 'add-posts', redirectTo: '/upload-posts', pathMatch: 'full' },
  // { path: '', redirectTo: '/upload-posts', pathMatch: 'full' },
  // { path: 'upload-posts', component: UploadPostsComponent },
  // { path: 'add-posts', component: AddPostsComponent},
  // { path: 'user-profile', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
