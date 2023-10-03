import {NgModule} from "@angular/core";
import {TablesComponent} from "./components/tables.component";
import {TablesRoutingModule} from "./tables-routing.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [TablesComponent],
  imports: [SharedModule, TablesRoutingModule],
})
export class TablesModule {
}
