import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ BlogService ]
})
export class HomeComponent implements OnInit {

  allBlogs = [''];

  constructor(private blogData: BlogService) { }

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
