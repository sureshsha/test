import { Component, OnInit } from '@angular/core';
declare var jQuery;
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  providers: [ BlogService ]
})
export class CounterComponent implements OnInit {
  allBlogs = [''];
  total;

  constructor(private blogData: BlogService) { }
  

  ngOnInit() {
    this.blogData.getAllBlogs().subscribe(
      data => {
       this.allBlogs = data;
       this.total = this.allBlogs.length;
       console.log(this.total);
      },
      error => {
        console.log('Some is went wrong');
      }
    );
  }

  }
