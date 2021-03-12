import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { DragDropModule } from "@angular/cdk/drag-drop";

const MODULES = [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDividerModule,
    DragDropModule
];

@NgModule({
    declarations: [],
    imports: [CommonModule, ...MODULES],
    exports: [...MODULES],
    providers: [],
})
export class SharedModule {}
