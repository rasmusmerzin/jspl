import { readable, writable } from "svelte/store";
import { EXAMPLES } from "$lib/examples";

export const examples = readable(EXAMPLES);

export const ctrlPressed = writable(false);
