// src/app/pages/dashboard/dashboard.ts
import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';
import {  Hive } from '../../core/services/hive';
import { PoidsChartComponent } from '../../shared/components/poids-chart/poids-chart.component';
import { RouterModule } from '@angular/router';
import { HiveService } from '../../services/hive.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, PoidsChartComponent, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit, AfterViewInit {
  private hiveService = inject(HiveService);

  map!: L.Map;
  hives: Hive[] = [];
  stats = { totalHives: 0, averageWeight: 0, apiaries: 0 };

  ngOnInit(): void {
    this.hives = this.hiveService.getHives(28);
    this.computeStats();
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.loadHives();
  }

  private computeStats() {
    this.stats.totalHives = this.hives.length;
    this.stats.averageWeight = Math.round(this.hives.reduce((s, h) => s + h.poids, 0) / Math.max(1, this.hives.length));
    this.stats.apiaries = Math.max(1, Math.round(this.hives.length / 6));
  }

  initMap() {
    const mapEl = document.getElementById('map');
    if (mapEl && (mapEl as any)._leaflet_id) { (mapEl as any)._leaflet_id = null; }
    this.map = L.map('map', { zoomControl: true }).setView([3.8480, 11.5021], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap' }).addTo(this.map);
  }

  private createBeeIcon() {
    return L.divIcon({
      className: 'bee-marker',
      html: `<div class="bee-icon">🐝</div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });
  }

  loadHives() {
    const beeIcon = this.createBeeIcon();
    this.hives.forEach(h => {
      const marker = L.marker([h.lat, h.lng], { icon: beeIcon }).addTo(this.map);
      const popupHtml = `
        <div class="popup-brief">
          <strong>${h.name}</strong><br/>
          Poids: ${h.poids} kg<br/>
          <small>Dernière connexion: ${new Date(h.lastSeen!).toLocaleString()}</small><br/>
          <a href="/ruches/${h.id}" class="popup-link">Voir détails</a>
        </div>`;
      marker.bindPopup(popupHtml);
    });
  }

  getChartSeries() {
    return this.hives.slice(0, 3).map(h => ({
      label: h.name,
      data: Array.from({length:7}).map(()=> Math.round(h.poids + (Math.random()*4 - 2)))
    }));
  }
}
