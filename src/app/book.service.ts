import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, BookApi } from './book';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksUrl = 'http://localhost:8080/api/books';  // URL to web api
  constructor(private http: HttpClient) { }

  //offset: number, pageSize:number
  getBooks(search: string, offset: number, pageSize: number): Observable<BookApi> {
    console.log("search ..=", search, offset, pageSize)
    const url = `${this.booksUrl}/${search}/${offset}/${pageSize}`;
    return this.http.get<BookApi>(url);
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, book, httpOptions);
  }

  deleteBook(book: Book | string): Observable<Book> {
    const isbn = typeof book === 'string' ? book : book.isbn;
    const url = `${this.booksUrl}/${isbn}`;

    return this.http.delete<Book>(url, httpOptions);
  }

  updateBook(book: Book): Observable<any> {
    return this.http.put(this.booksUrl, book, httpOptions);
  }
}