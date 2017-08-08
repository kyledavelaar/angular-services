import { Component, EventEmitter, Input, Output } from '@angular/core';
//import FILE SERVICE IS IN
import { LoggingService } from '../logging.service';
import { AccountsService } from '../account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  //ADD PROVIDER WITH SERVICE...BUT because we already have AccountsService in a parent component don't include it in providers.  But do include all other parts like import, constructor, etc. 
  // providers: [LoggingService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  // @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();

  //NEED CONSTRUCTOR TO INSTANTIATE SERVICE
  constructor(private loggingService: LoggingService, 
    private accountsService: AccountsService) {}

  onSetTo(status: string) {
    // this.statusChanged.emit({id: this.id, newStatus: status});
    this.accountsService.updateStatus(this.id, status);
    //USING SERVICE WE REPLACE THE CONSOLE.LOG BELOW WITH THIS LINE
    // this.loggingService.logStatusChange(status)
    // console.log('A server status changed, new status: ' + status);

    //with services can have cross component communication: 
    //set up emitter in account.service, emitted in account.component and subscribed in new-account.component
    this.accountsService.statusUpdated.emit(status);
  }

}
