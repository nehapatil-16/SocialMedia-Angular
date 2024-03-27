import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddPostsComponent } from '../components/add-posts/add-posts.component';
import { MiddlePanelComponent } from '../components/middle-panel/middle-panel.component';
import { ReportPostsComponent } from '../components/report-posts/report-posts.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { FriendsComponent } from '../components/friends/friends.component';
import { SignUpPageComponent } from '../components/sign-up-page/sign-up-page.component';
import { SignInPageComponent } from '../components/sign-in-page/sign-in-page.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { EditProfileComponent } from '../components/edit-profile/edit-profile.component';
import { CommentComponent } from '../components/comment/comment.component';
import { ChatsComponent } from '../components/chats/chats.component';
import { UserschatComponent } from '../components/userschat/userschat.component';
import { FriendRequestComponent } from '../components/friend-request/friend-request.component';
import { AddStoryComponent } from '../components/add-story/add-story.component';
import { AuthGuard } from '../guards/auth.guard';
import { ForgetpasswordComponent } from '../components/forgetpassword/forgetpassword.component';

const routes: Routes = [
  { path: '', redirectTo: 'signIn', pathMatch: 'full' }, // Redirect to signin page by default
  { path: 'signup', component: SignUpPageComponent },
  { path: 'signIn', component: SignInPageComponent },
  { path: 'forgetpassword', component: ForgetpasswordComponent},
  { path: 'signin', redirectTo: 'forgetpassword', pathMatch:'full'},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MiddlePanelComponent, canActivate: [AuthGuard]},
      { path: 'add-posts', component: AddPostsComponent, canActivate: [AuthGuard]},
      { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
      { path: 'edit-profile/:id', component: EditProfileComponent, canActivate: [AuthGuard]},
      { path: 'friends', component: FriendsComponent, canActivate: [AuthGuard]},
      { path: 'report-post/:id', component: ReportPostsComponent, canActivate: [AuthGuard]},
      { path: 'comment/:id', component: CommentComponent, canActivate: [AuthGuard]},
      { path: 'userschat', component: UserschatComponent, canActivate: [AuthGuard]},
      // { path: 'chats/:userId', component: ChatsComponent, canActivate: [AuthGuard]},
      { path: 'chats/:userId/:profilepic', component: ChatsComponent },
      { path: 'friend-request', component: FriendRequestComponent, canActivate: [AuthGuard]},
      { path: 'add-story', component: AddStoryComponent, canActivate: [AuthGuard]},

    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
