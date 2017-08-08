import { Injectable, EventEmitter } from '@angular/core';

import { LoggingService } from './logging.service';

//NEED TO ADD METADATA TO THIS SERVICE TO CREATE SERVICE WITHIN SERVICE so add @Injectable
@Injectable()
export class AccountsService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  //ADD A SERVICE WITHIN A SERVICE step 2 with constructor
  constructor(private loggingService: LoggingService) {}

  //with services can have cross component communication: 
  //set up emitter in account.service, emitted in account.component and subscribed in new-account.component
  statusUpdated = new EventEmitter<string>();

  addAccount(name: string, status: string) {
    this.accounts.push({name: name, status: status});
    this.loggingService.logStatusChange(status);
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);
  }
}