import { Directive, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Directive()
export abstract class BaseComponent implements OnDestroy{
    destroy$ = new Subject();

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.destroy$.next();
    }
}