<script lang="ts">
  import { Dialog, Tooltip } from "bits-ui";
  import type { KeyState } from "./types";
  import KeyboardDialog from "./KeyboardDialog.svelte";
  import { COLOUR_CLASS_MAP, STORAGE_KEY } from "./consts";
  import "./app.css";
  import { keyboards } from "./keyboards.svelte";

  $effect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keyboards));
  });

  let currentKey: (KeyState & { position: [number, number] }) | undefined =
    $state();

  function setPosition(rowIndex: number, keyIndex: number) {
    currentKey = {
      ...keyboards[0].data[rowIndex][keyIndex],
      position: [rowIndex, keyIndex],
    };
  }

  function saveKey() {
    if (!currentKey) throw new Error("no key to save");
    const {
      position: [rowIndex, keyIndex],
      ...newKey
    } = currentKey;
    keyboards[0].data[rowIndex][keyIndex] = newKey;
  }
</script>

<Dialog.Root>
  {#each keyboards[0].data as row, rowIndex}
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
