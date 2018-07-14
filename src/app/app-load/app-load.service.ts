import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { APP_SETTINGS } from '../settings';

@Injectable()
export class AppLoadService {
  joke: any;
  setting: any;

  constructor(private httpClient: HttpClient) { }

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('second API Calls');
      setTimeout(() => {
        console.log(`second API Calls inside setTimeout`);
        // doing something
        console.log(`First API Calls data `, APP_SETTINGS);
        this.httpClient
          .get('https://api.icndb.com/jokes/random')
          .subscribe(response => {
            this.joke = response['value'];
            console.log(this.joke);
            console.log("second API Calls ends");
            resolve(true);
          })
      }, 3000);

    });
  }

  getSettings(): Promise<any> {
    console.log(`First API Calls`);

    const promise = this.httpClient.get('http://private-1ad25-initializeng.apiary-mock.com/settings')
      .toPromise()
      .then(settings => {
        console.log(`First API Calls Ends`, settings);
        APP_SETTINGS.connectionString = settings[0].value;
        APP_SETTINGS.defaultImageUrl = settings[1].value;
        this.setting = settings[0].value;
        return settings;
      });

    return promise;
  }
}
