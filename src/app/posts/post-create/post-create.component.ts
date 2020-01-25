import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostService } from '../post.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';
  post: Post;
  private mode = 'create';
  private postid: string;

    constructor(public postService: PostService, public route: ActivatedRoute) {}

    ngOnInit() {
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('postId')) {
          this.mode = 'edit';
          this.postid = paramMap.get('postId');
          this.post = this.postService.getPost(this.postid);
        } else {
          this.mode = 'create';
          this.postid = null;
        }
      });
    }


  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postService.addPost(form.value.title, form.value.content);
    } else {
      this.postService.updatePost(
        this.postid,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }

}
