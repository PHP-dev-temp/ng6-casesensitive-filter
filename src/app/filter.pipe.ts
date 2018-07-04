import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, filterCaseSensitive: boolean): any {
    let output = [];
    let include: boolean;
    if ( value === null || filterString === '' ) {
      return value;
    }
    if ( value.length === 0 || filterString === '' ) {
      return value;
    }
    if(filterCaseSensitive){
      for ( const item of value) {
        item['name'] = item['name'].replace(/<\/?b[^>]*>/g, '');
        item['about'] = item['about'].replace(/<\/?b[^>]*>/g, '');
        const tempname = item['name'].toLowerCase();
        const tempabout = item['about'].toLowerCase();
        const tempfilt= filterString.toLowerCase();
        include = false;
        if (tempname.includes(tempfilt) || tempabout.includes(tempfilt)) {
          output.push(item);
        }
      }
    } else {
      for ( const item of value) {
        include = false;
        item['name'] = item['name'].replace(/<\/?b[^>]*>/g, '');
        item['about'] = item['about'].replace(/<\/?b[^>]*>/g, '');
        if (item['name'].includes(filterString)) {
          include = true;
          item['name'] = item['name'].split(filterString).join('<b>' + filterString + '</b>');
        }
        if (item['about'].includes(filterString)) {
          include = true;
          item['about'] = item['about'].split(filterString).join('<b>' + filterString + '</b>');
        }
        if (include) {
          output.push(item);
        }
      }
    }
    return output;
  }

}
