import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractMapper} from "./mappers/AbstractMapper";
import {BaseMapper} from "./mappers/base-mapper";
import {KeywordMapper} from "./mappers/keyword-mapper";
import {OperationMapper} from "./mappers/operation-mapper";
import {TableMapper} from "./mappers/table-mapper";
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
