import { helper } from '@ember/component/helper';
import moment from 'npm:moment/min/moment-with-locales';

export function formatDate(params/*, hash*/) {
  moment.locale('pt');
  return moment(params, "YYYY-MM-DD HH:mm").format('ll HH:mm');
}

export default helper(formatDate);
