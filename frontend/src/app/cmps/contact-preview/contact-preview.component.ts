import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { Contact } from '../../models/contact.model'
import { Observable, of } from 'rxjs';

@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrl: './contact-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContactPreviewComponent {

  @Input() contact!: Contact
  @Input() index!: number
  @Output() onRemove = new EventEmitter<string>()

  imageUrl: string = ''

  // ngAfterViewInit() {
  //   this.imageUrl = this.getImage()
  // }

  getImage(id: string): string {
    if (+id % 2 === 0)
      return `https://xsgames.co/randomusers/assets/avatars/female/${id}.jpg`;
    else
      return `https://xsgames.co/randomusers/assets/avatars/male/${id}.jpg`;
  }


  confirmAndRemove(ev: MouseEvent, contactId: string) {
    ev.stopPropagation()
    ev.preventDefault()

    if (confirm('Are you sure you want to delete this contact?')) {
      this.onRemove.emit(contactId)
    }
  }

  stopP(ev: MouseEvent) {
    ev.stopPropagation()
  }
}
