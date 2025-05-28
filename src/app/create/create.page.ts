import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, set } from "firebase/database";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

const db = getDatabase();

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  standalone:false
})
export class CreatePage implements OnInit {

  // constructor() { }
    infoForm = this.formBuilder.group({
    info_title: [null, Validators.required],
    info_description: [null, Validators.required]
  });
  
    constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

   saveInfo() {
    const id = uuidv4();
    set(ref(db, 'infos/' + id), this.infoForm?.value).then((newInfo: any) => {
      this.router.navigate(['/detail', { id: id }]);
    })
  }

  ngOnInit() {
  }

}
