import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { MyBlogComponent } from './myBlog/myBlog.component';
import { AboutComponent } from './About/about.component';
import { BlogViewComponent } from './blog-view/blog-view.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'myBlog', component: MyBlogComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent },
    // { path: 'blog/:id', component: BlogViewComponent },
    { path: 'allBlogs/:id', component: BlogViewComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
