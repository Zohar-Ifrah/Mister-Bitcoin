import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';

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
  filterSubject = new Subject
  filterBy!: Filter

  ngOnInit(): void {
    this.contactService.filterBy$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(filterBy => {
        this.filterBy = filterBy
      })
    this.filterSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(
        () => this.contactService.setFilterBy(this.filterBy)
      )
  }

  onSetFilterBy(value: string) {
    this.filterSubject.next(value)
  }
}
