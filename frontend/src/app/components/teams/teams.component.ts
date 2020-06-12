import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { Team } from './team';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teams: Observable<Team[]>;

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.teams = this.teamService.getData();
  }

  onDelete(id: string) {
    if (confirm('Confirm deletion')) {
      console.log(id);
      this.teamService.deleteTeam(id).subscribe(data => {
        this.getData();
        console.log('Quote Deleted');
      });
    }
  }

}
