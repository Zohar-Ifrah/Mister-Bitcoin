import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Msg } from '../../models/msg.model';
import { MsgService } from '../../services/msg.service';

@Component({
    selector: 'msg',
    templateUrl: './msg.component.html',
    styleUrls: ['./msg.component.scss']
})
export class MsgComponent {

    constructor(private msgService: MsgService) {
        this.msg$ = this.msgService.msg$
    }

    msg$: Observable<Msg | null>;



    onCloseMsg() {
        this.msgService.closeMsg()
    }
}
