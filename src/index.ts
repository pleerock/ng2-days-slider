import {Component, Output, EventEmitter, Input} from "@angular/core";

@Component({
    selector: "days-slider",
    styles: [`
ul.days-slider {
    text-align: center;
}
ul.days-slider li.arrow-left a, ul.days-slider li.arrow-right a {
    padding: 16px 10px;
}
ul.days-slider li {
    cursor: pointer;
}
ul.days-slider li.current-date a {
    background-color: #e3f8f6;
}
`],
    template: `
<nav>
    <ul class="pagination days-slider">
        <li class="arrow-left" [class.disabled]="isMinDay()" (click)="prevDay()">
            <a>
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li *ngFor="let date of dates" 
            [class.active]="areDaysEqual(date, selectedDate)"
            [class.current-date]="!areDaysEqual(date, selectedDate) && areDaysEqual(date, currentDate)" 
            (click)="changeDate(date)">
            <a> 
                {{ date | date : 'd' }}<br/>
                {{ date | date : 'MMMM' }}
            </a>
        </li>
        <li class="arrow-right" [class.disabled]="isMaxDay()" (click)="nextDay()">
            <a>
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</nav>
`
})
export class DaysSlider {

    // -------------------------------------------------------------------------
    // Inputs / Outputs
    // -------------------------------------------------------------------------

    @Input("date")
    selectedDate: Date;

    @Output("dateChange")
    selectedDateChange = new EventEmitter();

    @Input()
    currentDate = new Date();

    @Input()
    minDate: Date;

    @Input()
    maxDate: Date;

    @Input()
    visibleDays = 7;

    dates: Date[] = [];

    // -------------------------------------------------------------------------
    // Input
    // -------------------------------------------------------------------------

    prevDay() {
        if (this.isMinDay()) return;

        const firstDate = this.dates[0];
        const prevDate = new Date();
        prevDate.setFullYear(firstDate.getFullYear());
        prevDate.setMonth(firstDate.getMonth());
        prevDate.setDate(firstDate.getDate() - 1);
        
        if (this.areDaysEqual(prevDate, this.currentDate)) {
            this.dates.splice(0, 0, this.currentDate);
        } else if (this.areDaysEqual(prevDate, this.selectedDate)) {
            this.dates.splice(0, 0, this.selectedDate);
        } else {
            this.dates.splice(0, 0, prevDate);
        }
        this.dates.pop();
    }

    nextDay() {
        if (this.isMaxDay()) return;

        const lastDate = this.dates[this.dates.length - 1];
        const nextDate = new Date();
        nextDate.setFullYear(lastDate.getFullYear());
        nextDate.setMonth(lastDate.getMonth());
        nextDate.setDate(lastDate.getDate() + 1);

        if (this.areDaysEqual(nextDate, this.currentDate)) {
            this.dates.push(this.currentDate);
        } else if (this.areDaysEqual(nextDate, this.selectedDate)) {
            this.dates.push(this.selectedDate);
        } else {
            this.dates.push(nextDate);
        }
        this.dates.shift();
    }

    areDaysEqual(date1: Date, date2: Date) {
        return  date1 &&
                date2 &&
                date1.getDate() === date2.getDate() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getFullYear() === date2.getFullYear();
    }

    isMinDay() {
        return this.minDate && this.areDaysEqual(this.minDate, this.dates[0]);
    }

    isMaxDay() {
        return this.maxDate && this.areDaysEqual(this.maxDate, this.dates[this.dates.length - 1]);
    }

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor() {
        this.buildInitialDates();
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    changeDate(date: Date): boolean {
        this.selectedDate = date;
        this.selectedDateChange.emit(date);
        return true;
    }

    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------

    private buildInitialDates() {
        const startDate = this.selectedDate || this.currentDate;
        while (this.dates.length < this.visibleDays - 1) {
            const date = new Date();
            date.setDate(startDate.getDate() - (this.visibleDays - 1 - this.dates.length));
            this.dates.push(date);
        }
        this.dates.push(startDate);
    }

}