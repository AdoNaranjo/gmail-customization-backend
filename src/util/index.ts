export const isOneInstanceOf = (list: Array<any>, obj: any) => {
  for (const key in list) {
    if (list.hasOwnProperty(key)) {
      const instanceType = list[key];
      if ( obj instanceof instanceType) {
        return true;
      }
    }
  }

  return false;
};

export const isNotOneInstanceOf = (list: Array<any>, obj: any) => {
  return !isOneInstanceOf(list, obj);
};
