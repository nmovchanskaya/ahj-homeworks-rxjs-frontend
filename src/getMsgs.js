import {
  map, interval, catchError, switchMap, of,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

export default function getMsgs(url, obj) {
  return interval(10000)
    .pipe(
      switchMap((value) => ajax({
        url,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'rxjs-custom-header': 'Rxjs',
        },
        body: JSON.stringify(obj),
      }).pipe(
          map((resp) => {
            console.log('response: ', resp);
            return resp.response.messages;
          }),
          catchError((error) => {
            console.log('error: ', error);
            return of(error);
          }),
      )),
    );
}
