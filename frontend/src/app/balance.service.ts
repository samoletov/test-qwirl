import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of , BehaviorSubject} from 'rxjs';
import { Balance } from './model/balance';
import * as _ from 'lodash';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  private balanceUrl = environment.backend + '/account/balance';

  private balanceSource = new BehaviorSubject(Balance);
  currentBalance = this.balanceSource.asObservable();

  constructor(private http: HttpClient) {}

  changeBalance(balance: any) {
    this.balanceSource.next(balance);
  }

  refreshBalance() {
    this.getBalance().subscribe(balance => this.changeBalance(balance));
  }

  getBalance() {
    return this.http.get<Balance>(this.balanceUrl);
  }

  addToBalance(amount: number): Observable<Balance> {
    let params = new HttpParams();
    params = params.set('amount', String(amount));
    return this.http.patch<Balance>(this.balanceUrl, params);
  }

  removeFromBalance(amount: number): Observable<Balance> {
    let params = new HttpParams();
    params = params.set('amount', String(-amount));
    return this.http.patch<Balance>(this.balanceUrl, params);
  }

}
