import { Component, EventEmitter, Output } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'], 
  //ADD PROVIDER WITH SERVICE...BUT because we already have AccountsService in a parent component don't include it in providers.  But do include all other parts like import, constructor, etc. 
  // providers: [LoggingService]
})
export class NewAccountComponent {
  // @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  //need to have a constructor to use a SERVICE which we created in logging.service.ts
  constructor(private loggingService: LoggingService, 
    private accountsService: AccountsService) {
      //with services can have cross component communication: 
      //set up emitter in account.service, emitted in account.component and subscribed in new-account.component
      this.accountsService.statusUpdated.subscribe(
        (status: string) => alert('new status: ' + status)
      )
    }

  onCreateAccount(accountName: string, accountStatus: string) {
    // this.accountAdded.emit({
    //   name: accountName,
    //   status: accountStatus
    // });

    //now can use service we instantiated in constructor
    // this.loggingService.logStatusChange(accountStatus);
    this.accountsService.addAccount(accountName, accountStatus);
     
  }
  
}
