import {Injectable} from "@angular/core";
import {ReleveOperationDto} from "../dtos/releve-operations/ReleveOperationDto";
import {HistoricFilter} from "../../features/historic/HistoricFilter";
import * as _moment from 'moment';
import _rollupMoment, {Moment} from 'moment';

const moment = _rollupMoment || _moment;

@Injectable({
  providedIn: 'root',
})
export class HistoricFilterMapper {

  public mapToHistoricFilter(releve: ReleveOperationDto): HistoricFilter {
    const minDate: Moment = moment(releve.minDate).startOf('month');
    const maxDate: Moment = moment(releve.maxDate).endOf('month');
    return {
      minDate: minDate,
      maxDate: maxDate,
      minPrice: releve.minPrice,
      maxPrice: releve.maxPrice,
      search: '',
      selectedCategories: []
    }
  }
}
