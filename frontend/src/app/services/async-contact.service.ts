import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { Observable, BehaviorSubject, throwError, of } from 'rxjs'
import { catchError, switchMap, tap } from 'rxjs/operators'
import { Contact } from '../models/contact.model'
import { Filter } from '../models/filter.model'
import { NavigationEnd, Router } from '@angular/router'

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    private _apiUrl = 'https://mister-bitcoin-7pqz.onrender.com/api/contact'
    // private _apiUrl = 'http://localhost:3000/api/contact'

    private _contacts$ = new BehaviorSubject<Contact[]>([])
    public contacts$ = this._contacts$.asObservable()

    private _filterBy$ = new BehaviorSubject<Filter>({ term: '' })
    public filterBy$ = this._filterBy$.asObservable()

    constructor(private http: HttpClient, private router: Router) {
        this.loadContacts().subscribe()

        // Listen to route changes and Clear the filter when the route changes
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this._clearFilter()
            }
        })
    }

    public loadContacts(): Observable<Contact[]> {
        return this.filterBy$.pipe(
            switchMap(filterBy => {
                const params = new HttpParams().set('name', filterBy.term)
                return this.http.get<Contact[]>(this._apiUrl, { params }).pipe(
                    tap(contacts => this._contacts$.next(contacts)),
                    catchError(this._handleError)
                )
            })
        )
    }

    public getContacts(): Observable<Contact[]> {
        return this.contacts$
    }

    public getContactById(id: string): Observable<Contact> {
        return this.http.get<Contact>(`${this._apiUrl}/${id}`).pipe(
            catchError(err => {
                console.error(`Contact with id ${id} not found!`, err)
                return throwError(() => new Error(`Contact with id ${id} not found!`))
            })
        )
    }

    public saveContact(contact: Contact): Observable<Contact> {
        return contact._id ? this._updateContact(contact) : this._addContact(contact)
    }

    private _addContact(contact: Contact): Observable<Contact> {
        return this.http.post<Contact>(this._apiUrl, contact).pipe(
            tap(newContact => {
                const contacts = this._contacts$.value
                this._contacts$.next([...contacts, newContact])
            }),
            catchError(this._handleError)
        )
    }

    private _updateContact(contact: Contact): Observable<Contact> {
        return this.http.put<Contact>(`${this._apiUrl}/${contact._id}`, contact).pipe(
            tap(updatedContact => {
                const contacts = this._contacts$.value
                const updatedContacts = contacts.map(c => c._id === updatedContact._id ? updatedContact : c)
                this._contacts$.next(updatedContacts)
            }),
            catchError(this._handleError)
        )
    }

    public deleteContact(id: string): Observable<void> {
        return this.http.delete<void>(`${this._apiUrl}/${id}`).pipe(
            tap(() => {
                const contacts = this._contacts$.value
                const updatedContacts = contacts.filter(contact => contact._id !== id)
                this._contacts$.next(updatedContacts)
            }),
            catchError(this._handleError)
        )
    }

    // public getRandomContact(): Observable<Contact> {
    //     return this.contacts$.pipe(
    //         switchMap(contacts => {
    //             if (contacts.length === 0) {
    //                 return throwError(() => new Error('No contacts available'))
    //             }
    //             const randomIndex = Math.floor(Math.random() * contacts.length)
    //             return of(contacts[randomIndex])
    //         })
    //     );
    // }

    public setFilterBy(filterBy: Filter) { // Trigger loadContacts when filter changes
        this._filterBy$.next(filterBy)
    }

    private _clearFilter() {
        this._filterBy$.next({ term: '' });
    }

    private _handleError(error: HttpErrorResponse) {
        console.error('An error occurred:', error)
        return throwError(() => new Error('Something went wrong; please try again later.'))
    }
}
