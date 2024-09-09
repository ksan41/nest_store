export class TypeCheck {
  static isEmpty(obj: Object | Array<Object>): boolean {
    if (obj == null || obj == undefined) return true;
    if (Object.keys(obj).length > 0) {
      if (typeof obj == 'string') {
        if (obj.length == 0) {
          return true;
        }
      }
      return false;
    } else return true;
  }
}
