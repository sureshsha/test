import { Component, OnInit } from '@angular/core';
// import { BlogService } from '../blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit {

  allBlogs = [''];

  constructor() { }

  ngOnInit() {
  }

}
