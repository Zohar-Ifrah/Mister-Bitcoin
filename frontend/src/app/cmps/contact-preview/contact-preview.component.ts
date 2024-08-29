import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Contact } from '../../models/contact.model'

@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrl: './contact-preview.component.scss'
})

export class ContactPreviewComponent {

  @Input() contact!: Contact
  @Output() onRemove = new EventEmitter<string>()


  getRoboHashUrl(id: string) {
    return `https://robohash.org/${this.contact._id}.png?size=300x300`
  }

  confirmAndRemove(ev: MouseEvent, contactId: string) {
    ev.stopPropagation()
    ev.preventDefault()

    if (confirm('Are you sure you want to delete this contact?')) {
      this.onRemove.emit(contactId)
    }
  }
}
