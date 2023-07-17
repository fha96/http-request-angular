import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post';
import { Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostSerService {
  posts: Post[];

  error = new Subject();
  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    // Send Http request
    const postData = {
      title: title,
      content: content,
    };
    this.http
      .post<Post>(
        'https://ng-complete-guide-580ab-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        postData, {
          observe: 'response'
        }
      )
      .subscribe(
        (postData) => {
          console.log(postData);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  getPosts() {
    // below you can add multiple params and then pass it to params value in the object instead of create an instance at it,
    // let customParams = new HttpParams();
    // customParams = customParams.append('name', 'fahad');
    // customParams = customParams.append('age', 20);
    return this.http
      .get<Post>(
        'https://ng-complete-guide-580ab-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        {
          headers: new HttpHeaders({
            Custom: 'Hello from HEADERS',
          }),
          params: new HttpParams().set('name', 'fahad'),
        }
      )
      .pipe(
        map((responseData) => {
          const postsArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      );
  }

  clearPosts() {
    return this.http.delete(
      'https://ng-complete-guide-580ab-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
    );
  }
}
