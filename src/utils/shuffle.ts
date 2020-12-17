export const shuffle = (stack: any) => {
    let shuffled = stack.map((a: any) => [Math.random(),a]).sort((a: any,b:any) => a[0]-b[0]).map((a:any) => a[1]);
    return shuffled
}

