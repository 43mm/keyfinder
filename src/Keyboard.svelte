<script lang="ts">
  import { getContext } from "svelte";
  import { Dialog, Tooltip } from "bits-ui";
  import KeyboardDialog from "./KeyboardDialog.svelte";
  import type { KeyState, NamedKeyboard } from "./types";
  import { COLOUR_CLASS_MAP, STORAGE_KEY } from "./consts";
  import "./app.css";

  const keyboard = getContext<NamedKeyboard[]>(STORAGE_KEY)[0];

  let currentKey: (KeyState & { position: [number, number] }) | undefined =
    $state();

  function setPosition(rowIndex: number, keyIndex: number) {
    currentKey = {
      ...keyboard.data[rowIndex][keyIndex],
      position: [rowIndex, keyIndex],
    };
  }

  function saveKey() {
    if (!currentKey) throw new Error("no key to save");
    const {
      position: [rowIndex, keyIndex],
      ...newKey
    } = currentKey;
    keyboard.data[rowIndex][keyIndex] = newKey;
  }
</script>

<Dialog.Root>
  {#each keyboard.data as row, rowIndex}
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
          <div style="width: {key.length * 70}px;"></div>
        {/if}
      {/each}
    </div>
  {/each}
  <KeyboardDialog {currentKey} {saveKey} />
</Dialog.Root>
