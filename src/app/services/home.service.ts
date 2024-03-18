import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Home } from '../interface/home';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  async getHome(): Promise<Home> {
    const range = 'home!A2:I2';
    const uri = 'https://sheets.googleapis.com/v4/spreadsheets/' +
    environment.home_spreadsheet_id + '/values/' + range +
    '?alt=json&key=' + environment.api_key

    return await fetch(uri)
      .then(async response => {
        const data = await response.json();
        const item = data.values[0];
        return {
          sloganTitle: item[0],
          sloganDescription: item[1],
          aboutTitle: item[2],
          aboutDescription: item[3],
          eventTitle: item[4],
          eventDescription: item[5],
          coverImages: [...item.slice(6)],
        };
      });
  }
}
