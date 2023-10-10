import {
  map, interval, catchError, switchMap, of,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

// every 10 sec send ajax request to url
// pass obj as body of request
// return subj from response
export default function getData(url, obj, subj) {
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
            return resp.response[subj];
          }),
          catchError((error) => {
            console.log('error: ', error);
            return of(error);
          }),
      )),
    );
}
