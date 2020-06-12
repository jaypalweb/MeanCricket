import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Team } from '../components/teams/team';
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

  createTeam(team: Team, image: File = null): Observable<Team> {
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);
    for (let key in team) {
      formData.append(key, team[key]);
    }
    return this.http.post<Team>(`${baseUrl}/teams`, formData);
  }

  updateTeam(id: string, team: Team, image: File = null): Observable<Team> {
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);
    for (let key in team) {
      formData.append(key, team[key]);
    }
    return this.http.put<Team>(`${baseUrl}/teams/${id}`, formData)
      .pipe(tap(data => console.log('Team:', data)));
  }

  deleteTeam(id: String) {
    return this.http.delete(`${baseUrl}/teams/${id}`);
  }
}
