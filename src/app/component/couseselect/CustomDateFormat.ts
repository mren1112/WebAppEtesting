import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
export const moment = _rollupMoment || _moment;
export const DD_MMM_YYYY = {
parse: {
dateInput: 'LL',
},
display: {
dateInput: 'DD-MMM-YYYY',
monthYearLabel: 'MMM YYYY',
dateA11yLabel: 'LL',
monthYearA11yLabel: 'MMMM YYYY',
},
};
