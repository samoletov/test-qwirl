import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of, observable} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Order } from './model/order';
import * as _ from 'lodash';
import { environment } from '../environments/environment';

import { BalanceService} from './balance.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderUrl = environment.backend + '/orders';

  constructor(private http: HttpClient, private balanceService: BalanceService) { }

  add(order: Order): Observable<Order> {
    let params = new HttpParams();
    params = params
    .set('amount', String(order.amount))
    .set('type', order.type)
    .set('symbol', order.symbol);
    return this.http.post<Order>(this.orderUrl, order);
  }

}
