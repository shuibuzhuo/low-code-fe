/**
 * 获取 query 参数里的某个参数的值
 * @param name 要获取的参数名
 * @returns 参数的值
 */
export function query(name: string): string | null {
  const search = location.search.substr(1);
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
  const res = search.match(reg);
  if (res === null) {
    return null;
  }
  return res[2] || "";
}

export function isEmpty(val: unknown) {
  if (val === "") return true;
  if (val === null) return true;
  if (val === undefined) return true;
  return false;
}
