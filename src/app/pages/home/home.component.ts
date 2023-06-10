import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  featuredArrayList: Array<any> = [];
  latestPostArrayList: Array<any> = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    console.log('In intilization of Home Component');

    this.postService.loadFeatured().subscribe((postData) => {
      this.featuredArrayList = postData;
    });

    this.postService.loadLatest().subscribe((latestPostData) => {
      this.latestPostArrayList = latestPostData;
    });
  }
}
