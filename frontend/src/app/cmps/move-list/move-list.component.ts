import { Component, inject, Input } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { Move } from '../../models/move.model';
import { Router } from '@angular/router';

@Component({
  selector: 'move-list',
  templateUrl: './move-list.component.html',
  styleUrl: './move-list.component.scss'
})
export class MoveListComponent {
  private router = inject(Router)
  _contact!: Contact | null
  title: string = ''
  home: string = ''

  @Input() moves!: Move[]
  @Input() set contact(contact: Contact | null) {
    if (contact) {
      const capitalizedName = this.capitalizeFirstLetter(contact.name);
      this.title = 'Your moves to ' + capitalizedName.substring(0, capitalizedName.indexOf(' ') + 1);
      this.home = ''
    } else {
      this.title = 'Last 3 moves'
      this.home = 'home'
    }
    this._contact = contact;
  }
  
  capitalizeFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  navToContact(id: string){
    this.router.navigate(['/contact', id])
  }
}
