import { Injectable, inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ClientService } from '../data-access/client.service';

export const clientsResolver: ResolveFn<void> = () => {
  inject(ClientService).loadAll();
};
