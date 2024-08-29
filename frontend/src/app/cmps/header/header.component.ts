import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  // title = "mister-bitcoin"
  // currPage = "home"

  // constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    // this.contactService.loadContacts().subscribe({
    //   error: err => {
    //     console.log('err:', err)
    //   }
    // })
  }


}
