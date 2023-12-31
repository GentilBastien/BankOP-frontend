import { Component } from '@angular/core';
import { BaseComponent } from '../../../shared/base.component';
import { FormBuilder } from '@angular/forms';
import { KeywordService } from '../../../core/services/keyword.service';

@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
})
export class KeywordsComponent extends BaseComponent {
  constructor(keywordService: KeywordService, fb: FormBuilder) {
    super(keywordService, fb);
  }
}
