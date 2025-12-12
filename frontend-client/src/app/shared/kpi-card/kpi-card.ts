// /shared/kpi-card/kpi-card.component.ts

import { Component, Input } from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  template: `
    <div class="kpi-card card">
      <div class="kpi-icon-wrapper" [ngStyle]="{'background-color': bgColor}">
        <span class="kpi-icon">{{ icon }}</span>
      </div>
      <div class="kpi-content">
        <div class="kpi-title">{{ title }}</div>
        <div class="kpi-value text-primary">{{ value }}</div>
      </div>
    </div>
  `,
  imports: [
    NgStyle
  ],
  styleUrls: ['./kpi-card.component.scss']
})
export class KpiCardComponent {
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() icon: string = '📈'; // Utilisons des emojis simples comme icônes pour le MVP
  @Input() bgColor: string = '#FFEBAA'; // Jaune clair par défaut
}
