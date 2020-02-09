import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Routes, Router} from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  providers: [Location]
})
export class BlogViewComponent implements OnInit {
  public currentBlog;
  constructor(private router: ActivatedRoute,
              private route: Router,
              private blogData: BlogService,
              private location: Location) { }
  
  

  ngOnInit() {
    let myBlogId = this.router.snapshot.paramMap.get('id');
    console.log(myBlogId);
    this.blogData.getSingleInformation(myBlogId).subscribe(data => {
       this.currentBlog =  data;
       console.log(this.currentBlog);
    });
  }

  goBack() {
    this.location.back();
  }
}
