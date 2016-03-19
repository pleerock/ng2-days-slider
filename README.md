# ng2-days-slider

Simple calendar days slider control for your angular2 applications using bootstrap3.
Does not depend of jquery.

## Installation

`npm install ng2-days-slider --save`

## Usage

There are two components.

First is a paginator that shows pages and reacts when they change:

```html
<days-slider [(date)]="date" [maxDate]="maxDate"></days-slider>
```

* `[(date)]` - date model to be changed on day change.
* `[maxDate]` - maximal date in the calendar
* `[minDate]` - minimal date in the calendar
* `visibleDays` - number of days visible for selection (to prevent pages overflow)

## Sample

```typescript
import {Component} from "angular2/core";
import {DaysSlider} from "ng2-days-slider/ng2-days-slider";

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
export class App {

    date = new Date();
    maxDate = new Date();

}
```

Take a look on samples in [./sample](https://github.com/pleerock/ng2-days-slider/tree/master/sample) for more examples of
usages.
