<script lang="ts">
  import { Dialog, Tooltip } from "bits-ui";
  import type { Key, KeyState } from "./types";
  import KeyboardDialog from "./KeyboardDialog.svelte";
  import { COLOUR_CLASS_MAP } from "./consts";
  import USEnglish from "./layouts/us.json";
  import "./app.css";

  const currentLayout: Key[][] = USEnglish;
  let keyboardState: KeyState[][] = $state(currentLayout);
  let dialogOpen = $state(false);
  let currentKey: (KeyState & { position: [number, number] }) | undefined =
    $state();

  function setPosition(rowIndex: number, keyIndex: number) {
    currentKey = {
      ...keyboardState[rowIndex][keyIndex],
      position: [rowIndex, keyIndex],
    };
  }

  function saveKey() {
    if (!currentKey) throw new Error("no key to save");
    const {
      position: [rowIndex, keyIndex],
      ...newKey
    } = currentKey;
    keyboardState[rowIndex][keyIndex] = newKey;
    dialogOpen = false;
  }
</script>

<Dialog.Root bind:open={dialogOpen}>
  {#each keyboardState as row, rowIndex}
    <div class="flex justify-between gap-x-1">
      {#each row as key, keyIndex}
        {#if key.id}
          <Dialog.Trigger onclick={() => setPosition(rowIndex, keyIndex)}>
            {#snippet child({ props: dialogProps })}
              <Tooltip.Root disabled={!key.command}>
                <Tooltip.Trigger {...dialogProps}>
                  {#snippet child({ props: tooltipProps })}
                    <button
                      {...tooltipProps}
                      class={[
                        "p-4 rounded text-s cursor-pointer hover:outline-2",
                        key.colour
                          ? `${COLOUR_CLASS_MAP[key.colour]} text-white`
                          : key.command
                            ? `${COLOUR_CLASS_MAP["slate"]} text-white`
                            : "bg-gray-100",
                        key.alignLeft
                          ? "text-left"
                          : key.alignRight
                            ? "text-right"
                            : "text-center",
                      ]}
                      style="width: {key.length * 70}px;"
                    >
                      {key.name}
                    </button>
                  {/snippet}
                </Tooltip.Trigger>
                <Tooltip.Content sideOffset={1}>
                  <Tooltip.Arrow />
                  <div class="p-4 border-2 bg-white rounded">
                    {key.command}
                  </div>
                </Tooltip.Content>
              </Tooltip.Root>
            {/snippet}
          </Dialog.Trigger>
        {:else}
          <div class="" style="width: {key.length * 70}px;"></div>
        {/if}
      {/each}
    </div>
  {/each}
  <KeyboardDialog {currentKey} {saveKey} />
</Dialog.Root>
