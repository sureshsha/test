import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { BlogService } from '../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ templateUrl: 'myBlog.component.html',
styleUrls: ['./myBlog.component.css'],
providers: [ BlogService ] })
export class MyBlogComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    @ViewChild('createBlogForm') formValues;
    blogTitle: string;
    blogDescription: string;
    blogBodyHtml: string;
    blogCategory: string;
    possibleCategories = ['falls', 'forests', 'birds', 'animals', 'flowers', 'pet animals', 'natures'];
    postedData;
    blogData;
    hidden = true;

    blogDeleted;

    baseUrl = 'http://localhost:3000/images/';
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private postBlogData: BlogService,
        private _route: ActivatedRoute,
        private router: Router
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
            console.log(this.currentUser.username);
        });
    }

    ngOnInit() {
        this.postBlogData.getAllBlogs().subscribe(
            data => {
                this.blogData = data;
                console.log(this.blogData.length);
            }
        );
        this.loadAllUsers();
    }

    public createBlog(): any {
        let blogData = {
          title: this.blogTitle,
          description: this.blogDescription,
          body: this.blogBodyHtml,
          category: this.blogCategory,
          author: this.currentUser.username,
          created: new Date().toISOString(),
          imagePath: this.baseUrl + this.blogCategory + '.jpg',
        };
        console.log(blogData);
        this.postBlogData.postBlog(blogData).subscribe(data => {
          this.postedData = data;
          console.log(this.postedData);
          this.formValues.resetForm();
          this.hidden = false;
          setTimeout(() => {
              this.hidden = true;
              this.router.navigate(['/allBlogs', data.id]);
          }, 5000);
        });
      }

      
    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers();
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
}
