import { Component, OnInit, Renderer, OnDestroy } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';


@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.css'],
    providers: [ BlogService ]
  })
  export class CarouselComponent implements OnInit {
    allBlogs = [''];
    lastBlog;
    secondLastBlog;
    thirdLastBlog;

    constructor(private blogData: BlogService) {}
    ngOnInit() {
      this.blogData.getAllBlogs().subscribe(
        data => {
         this.allBlogs = data;
         this.lastBlog = this.allBlogs[this.allBlogs.length - 1];
         this.secondLastBlog = this.allBlogs[this.allBlogs.length - 2];
         this.thirdLastBlog = this.allBlogs[this.allBlogs.length - 3];
         console.log(this.lastBlog);
        },
        error => {
          console.log('Some is went wrong');
        }
      );
      console.log(this.allBlogs);
     }

  }
