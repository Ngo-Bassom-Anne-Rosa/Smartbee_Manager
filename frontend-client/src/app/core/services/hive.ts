import { Injectable } from '@angular/core';
import { Hive } from '../../shared/hive-list-item/hive-list-item';

@Injectable({
  providedIn: 'root'
})
export class HiveService {

  private randomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  getHives(count = 24): Hive[] {
    const latMin = 2.0, latMax = 7.5;
    const lngMin = 8.5, lngMax = 16.5;
    const hives: Hive[] = [];

    for (let i = 1; i <= count; i++) {
      hives.push({
        id: i,
        name: `Ruche ${i}`,
        lat: parseFloat(this.randomBetween(latMin, latMax).toFixed(6)),
        lng: parseFloat(this.randomBetween(lngMin, lngMax).toFixed(6)),
        poids: Math.round(this.randomBetween(18, 45)),
        lastSeen: new Date().toISOString()
      });
    }
    return hives;
  }
}
