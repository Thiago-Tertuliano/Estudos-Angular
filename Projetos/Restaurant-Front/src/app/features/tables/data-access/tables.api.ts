import { HttpClient } from "@angular/common/http";
import { APP_CONFIG } from "@core/tokens/app-config.token";
import { Observable } from "rxjs";
import { Table } from "./table.model";
import { Injectable, inject } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TablesApi {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  getAll(): Observable<Table[]> {
    return this.http.get<Table[]>(`${this.config.apiUrl}/tables`);
  }
}
