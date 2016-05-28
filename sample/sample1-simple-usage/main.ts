import {bootstrap} from "@angular/platform-browser-dynamic";
import {Component} from "@angular/core";
import {DaysSlider} from "../../src/index";

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