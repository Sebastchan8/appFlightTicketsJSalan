import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'navFilter'
})
export class NavFilterPipe implements PipeTransform {

  transform(array:any[], text:string, column:string): any[] {
    if (text===''){
      return array
    }

    return array.filter(item =>{
      return item[column].includes(text)
    })
  }

}
