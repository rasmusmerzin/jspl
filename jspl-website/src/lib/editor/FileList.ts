import { loadFile } from "$lib/state";

export function onFileClick(event: MouseEvent) {
  const element = event.target as HTMLElement;
  const fileName = element.id.slice(0, element.id.length - "-File".length);
  loadFile(fileName);
}
