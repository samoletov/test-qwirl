import * as request from 'request-promise';
import ClientError from '../../shared/clientError';

import {Quote, Company} from '../../models/models';

const getApiUrl = (endpoint: string) => `https://www.alphavantage.co/query?function=${endpoint}&apikey=T41ZN3FJ9N208M8H`;
const getQuoteUrl = (symbol: string) => `${getApiUrl('GLOBAL_QUOTE')}&symbol=${symbol}`;
const getSearchUrl = (keyword: string) => `${getApiUrl('SYMBOL_SEARCH')}&keywords=${keyword}`;

class AlphaVantage {
  async getQuote(symbol: string) {
    const url = getQuoteUrl(symbol);
    const response = await request.get(url, { method: 'get', json: true });
    if (!response['Global Quote'] || !response['Global Quote']['01. symbol']) {
      throw new ClientError('No symbol found');
    }
    if (!Number(response['Global Quote']['05. price'])) {
      throw new ClientError('No price set for symbol');
    }
    return new Quote(response['Global Quote']['01. symbol'], Number(response['Global Quote']['05. price']));
  }
  async search(keyword: string) {
    const url = getSearchUrl(keyword);
    const response = await request.get(url, { method: 'get', json: true });
    return response.bestMatches.map((x: any) => new Company(x['1. symbol'], x['2. name']));
  }
}

export default AlphaVantage;
