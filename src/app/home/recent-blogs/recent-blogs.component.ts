import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-recent-blogs',
  templateUrl: './recent-blogs.component.html',
  styleUrls: ['./recent-blogs.component.css'],
  providers: [ BlogService ]
})
export class RecentBlogsComponent implements OnInit {
  allBlogs = [''];
    lastBlog;
    secondLastBlog;
    thirdLastBlog;

  constructor(private blogData: BlogService) { }

  ngOnInit() {
    this.blogData.getAllBlogs().subscribe(
      data => {
       this.allBlogs = data;
       this.lastBlog = this.allBlogs[this.allBlogs.length - 1];
       this.secondLastBlog = this.allBlogs[this.allBlogs.length - 2];
       this.thirdLastBlog = this.allBlogs[this.allBlogs.length - 3];
      },
      error => {
        console.log('Some is went wrong');
      }
    );
 }

}
