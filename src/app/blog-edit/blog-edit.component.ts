import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Routes, Router} from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {
  @ViewChild('createBlogForm') formValues;
  blogTitle: string;
  blogDescription: string;
  blogBodyHtml: string;
  blogCategory: string;
  possibleCategories = ['falls', 'forests', 'birds', 'animals', 'flowers', 'pet animals', 'natures'];
  hidden = true;
  baseUrl = 'http://localhost:3000/images/';
  postedData;
  blogDeleted;
  visible = true;
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

  public updateBlogData(): any {
    /* let blogData = {
      title: this.blogTitle,
      description: this.blogDescription,
      body: this.blogBodyHtml,
      category: this.blogCategory,*/
      this.currentBlog.imagePath = this.baseUrl + this.currentBlog.category + '.jpg';
    
    console.log(this.currentBlog);
    this.blogData.updateBlog(this.currentBlog.id, this.currentBlog).subscribe(data => {
      this.postedData = data;
      console.log(this.postedData);
      this.formValues.resetForm();
      this.hidden = false;
      setTimeout(() => {
          this.hidden = true;
          this.route.navigate(['/myBlog']);
      }, 5000);
      
    });
  }

  // delete the blog
  deleteBlogs() {
    this.blogData.deleteBlog(this.currentBlog.id).subscribe(data => {
        this.blogDeleted = data;
        this.visible = false;
        setTimeout(() => {
          this.visible = false;
          this.route.navigate(['/myBlog']);
        }, 2000);
    });
}

goBack() {
  this.location.back();
}
}
