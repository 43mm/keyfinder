<script lang="ts">
  import { ToggleGroup } from "bits-ui";
  import DialogContent from "./DialogContent.svelte";
  import type { KeyState } from "./types";
  import { COLOUR_CLASS_MAP } from "./consts";
  let {
    currentKey,
    saveKey,
  }: {
    currentKey: KeyState | undefined;
    saveKey: () => void;
  } = $props();
</script>

<DialogContent>
  {#if currentKey}
    <ToggleGroup.Root
      type="single"
      bind:value={
        () => currentKey!.colour,
        (v) => (currentKey!.colour = v ? v : undefined)
      }
      class="flex gap-1 mb-2"
    >
      {#each Object.entries(COLOUR_CLASS_MAP) as [colour, style]}
        <ToggleGroup.Item
          value={colour}
          class="size-4 {style} rounded data-[state=on]:outline-2 cursor-pointer"
        />
      {/each}
    </ToggleGroup.Root>
    <input
      id="command"
      type="text"
      bind:value={
        () => currentKey!.command,
        (v) => (currentKey!.command = v ? v : undefined)
      }
      class="w-full px-4 py-2 border rounded"
      placeholder="Enter command..."
    />
    <div class="flex w-full justify-end">
      <button
        class="bg-gray-100 cursor-pointer px-4 py-2 mt-2 rounded"
        onclick={saveKey}
        >Save
      </button>
    </div>
  {/if}
</DialogContent>
