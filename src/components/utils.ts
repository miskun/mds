export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function getControllableValue<T>(controlledValue: T | undefined, uncontrolledValue: T) {
  return controlledValue === undefined ? uncontrolledValue : controlledValue;
}
