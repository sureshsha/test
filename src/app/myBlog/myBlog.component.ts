import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { BlogService } from '../services/blog.service';

@Component({ templateUrl: 'myBlog.component.html',
providers: [ BlogService ] })
export class MyBlogComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    blogTitle: string;
    blogDescription: string;
    blogBodyHtml: string;
    blogCategory: string;
    possibleCategories = ["comedy", "Drama", "Action", "Technology"]
    postedData;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private postBlogData: BlogService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    public createBlog(): any {
        let blogData = {
          title: this.blogTitle,
          description: this.blogDescription,
          blogBody: this.blogBodyHtml,
          category: this.blogCategory
        };
        console.log(blogData);
        this.postBlogData.postBlog(blogData).subscribe(data => {
          this.postedData = data;
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
