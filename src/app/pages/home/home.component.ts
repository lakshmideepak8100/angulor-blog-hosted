import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  featuredArrayList: Array<any> = [];

  constructor(private postService: PostService) {
    console.log('In constructor of HomeComponent');
    this.postService.loadFeatured().subscribe((postData) => {
      console.log(postData);
      this.featuredArrayList = postData;
    });
  }

  ngOnInit(): void {
    console.log('In intilization of Home Component');
  }
}
