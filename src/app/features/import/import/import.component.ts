import {Component} from '@angular/core';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent {

  aze($event: any) {
    const file: File = $event.target.files[0];
  }
}
