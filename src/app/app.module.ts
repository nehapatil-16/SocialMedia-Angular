import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { PostsRoutingModule } from '../routes/upload-posts-routing';
import { AppComponent } from './app.component';
import { UserComponent } from '../components/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from '../services/http-error-handler.service';
import { MessageService } from '../services/message.service';
import { HeaderComponent } from '../components/header/header.component';
import { FollowRequestComponent } from '../components/follow-request/follow-request.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { AddPostsComponent } from '../components/add-posts/add-posts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { LeftPanelComponent } from '../components/left-panel/left-panel.component';
import { MiddlePanelComponent } from '../components/middle-panel/middle-panel.component';
import { RightPanelComponent } from '../components/right-panel/right-panel.component';
import { ReportPostsComponent } from '../components/report-posts/report-posts.component';
import { loginModule } from '../routes/login-route.module';
import { FriendsComponent } from '../components/friends/friends.component';
import { EditProfileComponent } from '../components/edit-profile/edit-profile.component';
import { FriendRequestComponent } from '../components/friend-request/friend-request.component';
import { CommentComponent } from '../components/comment/comment.component';
import { ChatsComponent } from '../components/chats/chats.component';
import { UserschatComponent } from '../components/userschat/userschat.component';
import { AddStoryComponent } from '../components/add-story/add-story.component';
import { StoryPanelComponent } from '../components/story-panel/story-panel.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ForgetpasswordComponent } from '../components/forgetpassword/forgetpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HeaderComponent,
    FollowRequestComponent,
    DashboardComponent,
    LeftPanelComponent,
    AddPostsComponent,
    UserProfileComponent,
    MiddlePanelComponent,
    RightPanelComponent,
    ReportPostsComponent,
    FriendsComponent,
    EditProfileComponent,
    FriendRequestComponent,
    CommentComponent,
    ChatsComponent,
    UserschatComponent,
    StoryPanelComponent,
    AddStoryComponent,
    ForgetpasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule ,
    ReactiveFormsModule ,
    loginModule,
    CarouselModule.forRoot(),
  ],
  providers: [HttpErrorHandler,
    MessageService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
