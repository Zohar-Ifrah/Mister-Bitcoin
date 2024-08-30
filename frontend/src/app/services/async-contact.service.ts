import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, combineLatest } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Contact } from '../models/contact.model';
import { Filter } from '../models/filter.model';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    private apiUrl = 'http://localhost:3000/api/contact'

    // BehaviorSubject to store and emit the list of contacts
    private _contacts$ = new BehaviorSubject<Contact[]>([])
    public contacts$ = this._contacts$.asObservable()

    private _filterBy$ = new BehaviorSubject<Filter>({ term: '' })
    public filterBy$ = this._filterBy$.asObservable()

    constructor(private http: HttpClient) {
        // Initialize contacts by loading them from the backend
        this.loadContacts().subscribe();
    }

    public loadContacts(): Observable<Contact[]> {
        return this.http.get<Contact[]>(this.apiUrl).pipe(
            tap(contacts => this._contacts$.next(contacts)), // Update BehaviorSubject
            catchError(this.handleError)
        );
    }
    public getContacts(): Observable<Contact[]> {
        return combineLatest([this.contacts$, this.filterBy$]).pipe(
            map(([contacts, filterBy]) => this._filterContacts(contacts, filterBy))
        );
    }

    public getContactById(id: string): Observable<Contact> {
        return this.http.get<Contact>(`${this.apiUrl}/${id}`).pipe(
            catchError(err => {
                console.error(`Contact with id ${id} not found!`, err);
                return throwError(() => new Error(`Contact with id ${id} not found!`));
            })
        );
    }

    public saveContact(contact: Contact): Observable<Contact> {
        return contact._id ? this._updateContact(contact) : this._addContact(contact);
    }

    private _addContact(contact: Contact): Observable<Contact> {
        return this.http.post<Contact>(this.apiUrl, contact).pipe(
            tap(newContact => {
                const contacts = this._contacts$.value;
                this._contacts$.next([...contacts, newContact]);
            }),
            catchError(this.handleError)
        );
    }

    private _updateContact(contact: Contact): Observable<Contact> {
        return this.http.put<Contact>(`${this.apiUrl}/${contact._id}`, contact).pipe(
            tap(updatedContact => {
                const contacts = this._contacts$.value;
                const updatedContacts = contacts.map(c => c._id === updatedContact._id ? updatedContact : c);
                this._contacts$.next(updatedContacts);
            }),
            catchError(this.handleError)
        );
    }

    public deleteContact(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
            tap(() => {
                const contacts = this._contacts$.value;
                const updatedContacts = contacts.filter(contact => contact._id !== id);
                this._contacts$.next(updatedContacts); // Update BehaviorSubject
            }),
            catchError(this.handleError)
        );
    }

    private _filterContacts(contacts: Contact[], filterBy: Filter): Contact[] {
        const term = filterBy.term.toLowerCase();
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(term) ||
            contact.email.toLowerCase().includes(term)
        );
    }

    public setFilterBy(filterBy: Filter) {
        this._filterBy$.next(filterBy);
    }

    private handleError(error: HttpErrorResponse) {
        console.error('An error occurred:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
    }
}
