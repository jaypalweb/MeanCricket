import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.scss']
})
export class TeamEditComponent implements OnInit {
  id: string;
  path: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let actionType = this.activatedRoute.snapshot.url[1].path;
    if (actionType == 'edit') {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
    }
    console.log(actionType);
    console.log(this.id);
  }

}
