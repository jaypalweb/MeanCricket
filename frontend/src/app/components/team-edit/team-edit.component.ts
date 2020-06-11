import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.scss']
})
export class TeamEditComponent implements OnInit {
  id: string;
  team = {
    name: '',
    country: '',
    desc: ''
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    let actionType = this.activatedRoute.snapshot.url[1].path;
    if (actionType == 'edit') {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
    }
    //console.log(actionType);
    //console.log(this.id);
  }

  onSave(form) {
    const data = form.value;
    if (this.id) {
      this.teamService.updateTeam(this.id, data).subscribe(team => {
        console.log(team);
        this.router.navigateByUrl('/teams');
      });
    } else {
      this.teamService.createTeam(data).subscribe(team => {
        console.log(team);
        this.router.navigateByUrl('/teams');
      });
    }
  }

}
