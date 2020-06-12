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
  fileToUpload: File = null;
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
    //ref - https://stackoverflow.com/questions/47936183/angular-file-upload (this is implemented here)
    //ref -https://www.techiediaries.com/angular-formdata/
    //ref - https://www.freakyjolly.com/angular-input-file-image-file-upload-to-base64-tutorial-by-example/

    const data = form.value;
    if (this.id) {
      this.teamService.updateTeam(this.id, data).subscribe(team => {
        console.log(team);
        this.router.navigateByUrl('/teams');
      });
    } else {
      this.teamService.createTeam(data, this.fileToUpload).subscribe(team => {
        console.log(team);
        this.router.navigateByUrl('/teams');
      });
    }


  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

}
