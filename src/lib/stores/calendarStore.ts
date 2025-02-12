import { writable } from "svelte/store"

export const viewType = writable<"month" | "week">("month")
export const weekStart = writable<"monday" | "sunday">("sunday")

