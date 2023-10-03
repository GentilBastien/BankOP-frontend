import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractMapper} from "./mappers/AbstractMapper";
import {BaseMapper} from "./mappers/BaseMapper";
import {KeywordMapper} from "./mappers/KeywordMapper";
import {OperationMapper} from "./mappers/OperationMapper";
import {TableMapper} from "./mappers/TableMapper";
import {HttpClientModule} from "@angular/common/http";

const mappers = [
  AbstractMapper,
  BaseMapper,
  KeywordMapper,
  OperationMapper,
  TableMapper
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, HttpClientModule
  ],
  exports: [HttpClientModule],
  providers: [mappers]
})
export class CoreModule {
}
