import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Team } from '../teams/team';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  getData(): Observable<Team[]> {
    return this.http.get<Team[]>(`${baseUrl}/teams`)
      .pipe(tap(data => console.log('Teams:', data)));
  }

  getTeam(id: string): Observable<Team> {
    return this.http.get<Team>(`${baseUrl}/teams/${id}`)
      .pipe(tap(data => console.log('Team:', data)));
  }

  createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(`${baseUrl}/teams`, team);
  }

  updateTeam(id: string, team: Team): Observable<Team> {
    return this.http.put<Team>(`${baseUrl}/teams/${id}`, team)
      .pipe(tap(data => console.log('Team:', data)));
  }

  deleteTeam(id: String) {
    return this.http.delete(`${baseUrl}/teams/${id}`);
  }
}
