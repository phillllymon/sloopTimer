export function arrDelete(arr: any[], val: any): any[] {
    let idx = -1;
    arr.forEach((ele, i) => {
        if (ele === val) {
            idx = i;
        }
    });
    if (idx > -1) {
        const before = arr.slice(0, idx);
        const after = arr.slice(idx + 1, arr.length);
        return before.concat(after);
    } else {
        return arr;
    }
}