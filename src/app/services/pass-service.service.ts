import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassServiceService {

  constructor() { }

  private id = new BehaviorSubject(0);
  currentId = this.id.asObservable();
  updateApprovalMessage(menuId: number) {
    this.id.next(menuId);
    }
}
