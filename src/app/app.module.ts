import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { MyBlogComponent } from './myBlog/myBlog.component';
import { AboutComponent } from './About/about.component';
import { BlogViewComponent } from './blog-view/blog-view.component';



import { CarouselComponent } from './home/carousel/carousel.component';;
import { CounterComponent } from './home/counter/counter.component'
;
import { RecentBlogsComponent } from './home/recent-blogs/recent-blogs.component'
;
import { BlogEditComponent } from './blog-edit/blog-edit.component'
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        FormsModule

    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        MyBlogComponent,
        AboutComponent,
        BlogViewComponent,
        CarouselComponent
,
        CounterComponent ,
        RecentBlogsComponent ,
        BlogEditComponent  ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
