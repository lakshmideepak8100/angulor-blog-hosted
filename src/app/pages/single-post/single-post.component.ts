import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/modal/post';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  postContent!: any;
  similarPostsData: Array<Post> = [];
  postId!: string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.postId = val['id'];
      this.updateViewCount();
      console.log('In Single Post Component');
      this.postService.loadPost(val['id']).subscribe((content) => {
        this.postContent = content;
        console.log(this.postContent);

        this.loadSimilarPosts(this.postContent.category.categoryId);
      });
    });
  }

  loadSimilarPosts(catId: string) {
    this.postService.loadSimilar(catId).subscribe((val) => {
      this.similarPostsData = val;
    });
  }
  updateViewCount() {
    console.log('In update views count');
    this.postService.countViews(this.postId);
  }
}
