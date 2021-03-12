import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared";
import { COMPONENTS } from "./components";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, SharedModule, RouterModule],
    exports: [...COMPONENTS],
    providers: [],
})
export class LayoutModule {}
