import { TestBed, async, waitForAsync } from "@angular/core/testing";
import { MatCardModule } from "@angular/material/card";
import { By } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { provideMockStore } from "@ngrx/store/testing";
import { TicketCardComponent } from "./ticket-card.component";

const MOCK_TICKET = {
    id: 1,
    title: "Cillum esse ut magna Lorem enim laborum ex qui culpa et.",
    description:
        "Fugiat ex irure duis qui sint ex esse fugiat ex officia sunt velit nulla. Ad consequat ad veniam eu id id do officia aliquip sint tempor ut elit duis. Do pariatur est sint enim laboris veniam veniam excepteur. Incididunt amet veniam exercitation labore. Aliqua ex Lorem est ut enim duis ad dolore exercitation.",
    assigneeId: 1,
    completed: false,
};

const MOCK_USER = {
    id: 1,
    name: "Craig",
};

describe("Ticket Card", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TicketCardComponent],
            providers: [
                provideMockStore({
                    initialState: {
                        cache: {
                            loadedTickets: {
                                [MOCK_TICKET.id]: MOCK_TICKET,
                            },
                            loadedUsers: {
                                [MOCK_USER.id]: MOCK_USER
                            },
                        }
                    },
                }),
            ],
            imports: [MatCardModule, RouterModule.forRoot([])],
        }).compileComponents();
    }));

    it("should create ticket card", async(() => {
        const fixture = TestBed.createComponent(TicketCardComponent);
        fixture.componentInstance.ticket = MOCK_TICKET
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    
    it("ticket card header should contain title", waitForAsync(async () => {
        const fixture = TestBed.createComponent(TicketCardComponent);

        console.log("HI")
        fixture.componentInstance.ticket = MOCK_TICKET
        fixture.detectChanges();
        await fixture.whenStable();
        console.log("HI")

        const outputDiv = fixture.debugElement.query(By.css('mat-card-header'))
        
        expect(outputDiv.nativeElement.innerHTML.includes(MOCK_TICKET.title)).toBe(true);
    }));
    
    it("ticket assignee should contain correct name", waitForAsync(async () => {
        const fixture = TestBed.createComponent(TicketCardComponent);

        fixture.componentInstance.ticket = MOCK_TICKET
        fixture.detectChanges();
        await fixture.whenStable();

        const outputDiv = fixture.debugElement.query(By.css('.ticket-assignee'))
        
        expect(outputDiv.nativeElement.innerHTML.trim()).toEqual(MOCK_USER.name);
    }));

    it("ticket card should notify on destroy", waitForAsync(() => {
        const fixture = TestBed.createComponent(TicketCardComponent);

        spyOn(fixture.componentInstance.destroy$, 'next');

        fixture.destroy();

        expect(fixture.componentInstance.destroy$.next).toHaveBeenCalled();

    }))
});
