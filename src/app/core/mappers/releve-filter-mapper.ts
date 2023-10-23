import {Injectable} from "@angular/core";
import {ReleveOperationDto} from "../dtos/releve-operations/ReleveOperationDto";
import {ReleveFilter} from "../../features/releve/releve-filter";
import _moment from 'moment';
import _rollupMoment, {Moment} from 'moment';

const moment = _rollupMoment || _moment;

@Injectable({
  providedIn: 'root',
})
export class ReleveFilterMapper {

  public mapToReleveFilter(releve: ReleveOperationDto): ReleveFilter {
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
