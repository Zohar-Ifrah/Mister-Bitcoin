import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ContactService } from '../../services/async-contact.service';
// import { ContactService } from '../../services/contact.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Filter } from '../../models/filter.model';

@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrl: './contact-filter.component.scss'
})
export class ContactFilterComponent implements OnInit {

  private destroyRef = inject(DestroyRef)
  private contactService = inject(ContactService)

  filterSubject = new Subject<string>();
  filterBy: Filter = { term: '' };

  ngOnInit(): void {
    this.contactService.filterBy$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(filterBy => {
        this.filterBy = filterBy
      })
    this.filterSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(
        term => this.contactService.setFilterBy({ term })
      )
  }

  onSetFilterBy(value: string) {
    this.filterSubject.next(value)
  }
}
