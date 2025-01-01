<script lang="ts">
  import { Dialog, ToggleGroup, Tooltip } from "bits-ui";
  import USEnglish from "./layouts/us.json";
  import "./app.css";

  type Keyboard = Row[];
  type Row = Key[];
  type Key = {
    id?: number;
    name?: string;
    length: number;
    alignLeft?: boolean;
    alignRight?: boolean;
  };
  const currentLayout: Keyboard = USEnglish;

  type Colour = "slate" | "red" | "orange" | "lime" | "sky" | "violet";
  type KeyState = Key & {
    command?: string;
    colour?: Colour;
  };
  type State = KeyState[][];
  const keyboardState: State = $state(currentLayout);

  let open = $state(false);
  let currentRow = $state(0);
  let currentKey = $state(0);
  let currentCommand = $state("");

  function setPosition(rowIndex: number, keyIndex: number) {
    currentRow = rowIndex;
    currentKey = keyIndex;
  }

  function saveCommand() {
    const command = currentCommand.trim() ? currentCommand.trim() : undefined;
    keyboardState[currentRow][currentKey] = {
      ...keyboardState[currentRow][currentKey],
      command,
    };
    open = false;
    currentCommand = "";
  }
</script>

<main class="grid place-items-center min-h-screen font-mono">
  <Tooltip.Provider delayDuration={0}>
    <div class="inline-flex flex-col gap-y-1">
      <h1 class="text-4xl">keyfinder</h1>
      <Dialog.Root bind:open>
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
                            class={{
                              "p-4 rounded text-s cursor-pointer hover:outline-2": true,
                              "bg-red-500 text-white": key.command,
                              "bg-gray-100": !key.command,
                              "text-left": key.alignLeft,
                              "text-right": key.alignRight,
                              "text-center": !key.alignLeft && !key.alignRight,
                            }}
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
        <Dialog.Portal>
          <Dialog.Overlay class="fixed inset-0 z-50 bg-black/80" />
          <Dialog.Content
            class="fixed left-[50%] top-[50%] z-50 grid w-md max-w-lg translate-x-[-50%] translate-y-[-50%] bg-white p-6 rounded shadow font-mono"
            ><input
              id="command"
              type="text"
              bind:value={currentCommand}
              class="w-full px-4 py-2 border rounded"
              placeholder="Enter command..."
            />
            <div class="flex w-full justify-end">
              <button
                class="bg-gray-100 cursor-pointer px-4 py-2 mt-2 rounded"
                onclick={saveCommand}
                >Save
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  </Tooltip.Provider>
</main>
