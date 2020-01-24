import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/v1/posts')
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))
    .subscribe((transformedPosts) => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });

  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title, content};
    this.http.post('http://localhost:3000/api/v1/posts', post)
    .pipe()
      .subscribe((responseData) => {
        console.log(responseData);
      });
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/v1/posts/' + postId)
    .subscribe(() => {
      console.log('Deleted!');
    });
  }
}
