
export function partial (fn, ...args) {
  return (...nArgs) => fn.apply(this, [...args, ...nArgs])
}
