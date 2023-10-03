import {NgModule} from "@angular/core";
import {KeywordsRoutingModule} from "./keywords-routing.module";
import {KeywordsComponent} from "./components/keywords.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [KeywordsComponent],
  imports: [SharedModule, KeywordsRoutingModule],
})
export class KeywordsModule {
}
