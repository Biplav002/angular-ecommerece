import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassServiceService {

  constructor() { }

  private id = new BehaviorSubject(0);
  private name = new BehaviorSubject('');
  currentId = this.id.asObservable();
  currentName = this.name.asObservable();
  updateApprovalMessage(menuId: number, menuName: string) {
    this.id.next(menuId);
    this.name.next(menuName);
    }
}
