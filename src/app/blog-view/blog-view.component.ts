import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Routes, Router} from '@angular/router';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html'
})
export class BlogViewComponent implements OnInit {
  public currentBlog;
  constructor(private router: ActivatedRoute,
              private route: Router,
              private blogData: BlogService) { }

  ngOnInit() {
    let myBlogId = this.router.snapshot.paramMap.get('id');
    console.log(myBlogId);
    this.blogData.getSingleInformation(myBlogId).subscribe(data => {
       this.currentBlog =  data;
       console.log(this.currentBlog);
    });
  }
}
