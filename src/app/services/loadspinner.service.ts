import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadspinnerService {

  constructor() {

  }
  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loading$ = this.isLoading.asObservable();
  ngOnInit(): void {
  }
  show() {
    this.isLoading.next(true);
  }
  hide() {
    this.isLoading.next(false);
  }

}
