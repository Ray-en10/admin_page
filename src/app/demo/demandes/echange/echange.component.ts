import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Echange } from 'src/app/models/echange';
import { EchangeService } from 'src/app/services/echange.service';

@Component({
  selector: 'app-echange',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, DatePipe],
  templateUrl: './echange.component.html',
  styleUrls: ['./echange.component.scss']
})
export class EchangeComponent implements OnInit {
  echanges: Echange[] = [];
  filteredEchanges: Echange[] = [];
  selectedEchange: Echange | null = null;
  showModal: boolean = false;

  codeFilter: string = '';
  timeFilter: string = '';

  codeOrder: string = 'asc';
  dateOrder: string = 'asc';

  currentPage: number = 1;
  itemsPerPage: number = 10;
  pages: number[] = [];

  constructor(private echangeService: EchangeService) {}

  ngOnInit(): void {
    this.fetchEchanges();
  }

  fetchEchanges(): void {
    this.echangeService.getAllEchanges().subscribe((data) => {
      this.echanges = data;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredEchanges = this.echanges.filter(echange =>
      (!this.codeFilter || echange.client?.code.includes(this.codeFilter)) &&
      (!this.timeFilter || new Date(echange.createdAt!).toISOString().slice(0, 10) === this.timeFilter)
    );
    this.updatePagination();
  }

  updatePagination(): void {
    const totalPages = Math.ceil(this.filteredEchanges.length / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    this.changePage(1);
  }

  changePage(page: number): void {
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.filteredEchanges = this.echanges.slice(startIndex, startIndex + this.itemsPerPage);
  }

  toggleCodeOrder(): void {
    this.codeOrder = this.codeOrder === 'asc' ? 'desc' : 'asc';
    this.filteredEchanges.sort((a, b) => {
      if (!a.client?.code || !b.client?.code) return 0;
      return this.codeOrder === 'asc' ? a.client.code.localeCompare(b.client.code) : b.client.code.localeCompare(a.client.code);
    });
  }

  toggleDateOrder(): void {
    this.dateOrder = this.dateOrder === 'asc' ? 'desc' : 'asc';
    this.filteredEchanges.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return this.dateOrder === 'asc' ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  showDetails(echange: Echange): void {
    this.selectedEchange = echange;
    this.showModal = true;
  }

  hideDetails(): void {
    this.showModal = false;
    this.selectedEchange = null;
  }

  validerDemande(echange: Echange): void {
    // Add your validation logic here
  }

  annulerDemande(echange: Echange): void {
    // Add your cancellation logic here
  }
}
