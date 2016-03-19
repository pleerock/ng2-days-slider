import {bootstrap} from "angular2/platform/browser";
import {Component} from "angular2/core";
import {DaysSlider} from "../../src/ng2-days-slider";

@Component({
    selector: "app",
    template: `
<div class="container">
    <days-slider [(date)]="date" [maxDate]="maxDate"></days-slider>
    
    <br/><div><span>Selected date: </span> {{ date | date }}</div>
</div>
`,
    directives: [DaysSlider]
})
export class Sample1App {

    date = new Date();
    maxDate = new Date();

}

bootstrap(Sample1App);