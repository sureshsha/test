import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
 import { HttpErrorService } from './http-error.service';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  public currentBlog;

  public allBlogs = [];

  public baseUrl: 'http://localhost:3000/';

  constructor(private http: HttpClient,
              private httpError: HttpErrorService) { }


// Method to get all blogs data
  public getAllBlogs(): Observable<any> {
    return this.http.get('http://localhost:3000/allBlogs')
    .pipe(catchError(this.httpError.handleError));
  }


  // Method to get only particular data

  public getSingleInformation(id: string): Observable<any> {
    return this.http.get('http://localhost:3000/allBlogs/' + id)
    .pipe(catchError(this.httpError.handleError));
  }

  public postBlog(blogData: any): Observable<any> {
    return this.http.post('http://localhost:3000/allBlogs/', blogData)
    .pipe(catchError(this.httpError.handleError));
  }


  public updateBlog(id: string, blogData: any): Observable<any> {
    return this.http.patch('http://localhost:3000/allBlogs/' + id , blogData)
    .pipe(catchError(this.httpError.handleError));

  }

  public deleteBlog(id: string): Observable<any> {
    return this.http.delete('http://localhost:3000/allBlogs/' + id)
    .pipe(catchError(this.httpError.handleError));
  }
}
