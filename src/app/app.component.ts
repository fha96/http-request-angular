import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, map } from 'rxjs';
import { Post } from './post';
import { PostSerService } from './post-ser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit,OnDestroy {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error = null;
  errSub: Subscription;

  constructor(private http: HttpClient, private postsService: PostSerService) {}

  ngOnInit() {
    this.errSub = this.postsService.error.subscribe(
      erroMsg => this.error = erroMsg
    );
    this.isFetching = true;
    this.postsService.getPosts().subscribe(
      (posts: Post[]) => {
        this.loadedPosts = posts;
        this.isFetching = false;
      },
      (error) => {
        this.error = error;
      }
    );
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = true;
    // Send Http request
    this.postsService.getPosts().subscribe(
      (posts: Post[]) => {
        this.loadedPosts = posts;
        this.isFetching = false;
      },
      (error) => {
        this.isFetching = false;
        this.error = error;
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postsService.clearPosts().subscribe((response) => {
      this.loadedPosts = [];
    });
  }
  onHandleError(){
    this.isFetching = false ;
    this.error = null ;
  }
  ngOnDestroy(): void {
    this.errSub.unsubscribe();
  }

}
