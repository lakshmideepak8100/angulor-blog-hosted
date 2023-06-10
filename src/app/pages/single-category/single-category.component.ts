import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css'],
})
export class SingleCategoryComponent implements OnInit {
  categoryPostList: Array<any> = [];
  categoryid!: string;
  categoryName!: string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['categoryid'];
      this.categoryid = id;
      this.categoryName = params['categoryName'];

      this.postService
        .loadCategoryPosts(this.categoryid)
        .subscribe((postData) => {
          this.categoryPostList = postData;
        });
    });
  }
}
