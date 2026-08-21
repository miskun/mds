export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function getControllableValue<T>(controlledValue: T | undefined, uncontrolledValue: T) {
  return controlledValue === undefined ? uncontrolledValue : controlledValue;
}

export function moveFocusWithin(
  event: { key: string; currentTarget: HTMLElement; preventDefault: () => void },
  selector: string,
) {
  const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
  if (!keys.includes(event.key)) return;

  const items = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>(selector));
  if (!items.length) return;

  event.preventDefault();

  const currentIndex = items.findIndex((item) => item === document.activeElement);
  const fallbackIndex = items.findIndex((item) => item.tabIndex === 0);
  const index = currentIndex >= 0 ? currentIndex : Math.max(fallbackIndex, 0);

  const nextIndex =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? items.length - 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? (index - 1 + items.length) % items.length
          : (index + 1) % items.length;

  items[nextIndex].focus();
  items[nextIndex].click();
}
