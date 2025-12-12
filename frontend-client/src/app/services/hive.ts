// src/app/core/services/hive.ts
import { Injectable } from '@angular/core';

export interface Hive {
  id: number;
  name: string;
  lat: number;
  lng: number;
  poids: number;
  lastSeen?: string;
}



@Injectable({
  providedIn: 'root'
})
export class HiveService {

  private randomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  // Génère N ruches dispersées sur le Cameroun
  getHives(count = 24): Hive[] {
    const hives: Hive[] = [];
    const latMin = 2.0, latMax = 7.5;
    const lngMin = 8.5, lngMax = 16.5;

    for (let i = 1; i <= count; i++) {
      hives.push({
        id: i,
        name: `Ruche ${i}`,
        lat: parseFloat(this.randomBetween(latMin, latMax).toFixed(6)),
        lng: parseFloat(this.randomBetween(lngMin, lngMax).toFixed(6)),
        poids: Math.round(this.randomBetween(18, 45)),
        lastSeen: new Date(Date.now() - Math.floor(Math.random()*48)*3600*1000).toISOString()
      });
    }
    return hives;
  }
}
