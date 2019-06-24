import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of, observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from './model/order';
import * as _ from 'lodash';
import { environment } from '../environments/environment';

import { BalanceService} from './balance.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private quoteUrl = environment.backend + '/quote';

  constructor(private httpClient: HttpClient) { }

  quote(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.httpClient.get(this.quoteUrl + '/' + term);
  }

  companies(term: string) {
    if (term === '') {
      return of([]);
    }
    let params = new HttpParams();
    params = params.set('query', String(term));

    return this.httpClient.get(environment.backend + '/companies', {params});
  }

}
