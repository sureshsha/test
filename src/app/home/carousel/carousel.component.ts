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

    constructor(private blogData: BlogService) {}
    ngOnInit() {
      this.blogData.getAllBlogs().subscribe(
        data => {
         this.allBlogs = data;
        },
        error => {
          console.log('Some is went wrong');
        }
      );
      console.log(this.allBlogs);
     }

  }
