import { Injectable } from '@angular/core';
import { Housinglocation } from './housinglocation';

@Injectable({
  providedIn: 'root',
})
export class HousingService {

  // readonly baseUrl = 'https://shorturl.at/gklyV';

  // housingLocationList: Housinglocation[] = [
  //   {
  //     id: 0,
  //     name: 'Acme Fresh Start Housing',
  //     city: 'Chicago',
  //     state: 'IL',
  //     photo: this.baseUrl,
  //     availableUnits: 4,
  //     wifi: true,
  //     laundry: true,
  //   },
  //   {
  //     id: 2,
  //     name: 'Warm Beds Housing Support',
  //     city: 'Juneau',
  //     state: 'AK',
  //     photo: this.baseUrl,
  //     availableUnits: 1,
  //     wifi: false,
  //     laundry: false,
  //   },
  //   {
  //     id: 3,
  //     name: 'Homesteady Housing',
  //     city: 'Chicago',
  //     state: 'IL',
  //     photo: this.baseUrl,
  //     availableUnits: 1,
  //     wifi: true,
  //     laundry: false,
  //   },
  //   {
  //     id: 4,
  //     name: 'Happy Homes Group',
  //     city: 'Gary',
  //     state: 'IN',
  //     photo: this.baseUrl,
  //     availableUnits: 1,
  //     wifi: true,
  //     laundry: false,
  //   },
  // ];

  url = 'http://localhost:3000/locations';

  async getAllHousingLocations(): Promise<Housinglocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  // getAllHousingLocations(): Housinglocation[] {
  //   return this.housingLocationList;
  // }

  async getHousingLocationById(id: number): Promise<Housinglocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  // getHousingLocationById(id: number): Housinglocation | undefined {
  //   return this.housingLocationList.find(housingLocation => housingLocation.id === id);
  // }

  constructor() {}
  
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes apllication received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}`
    );
  }
}
