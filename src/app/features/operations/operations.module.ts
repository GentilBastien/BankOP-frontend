import {NgModule} from "@angular/core";
import {OperationsComponent} from "./components/operations.component";
import {OperationsRoutingModule} from "./operations-routing.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [OperationsComponent],
  imports: [SharedModule, OperationsRoutingModule],
})
export class OperationsModule {
}
