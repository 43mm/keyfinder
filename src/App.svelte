<script lang="ts">
  import { Dialog, Tooltip } from "bits-ui";
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
  let selectedKey: KeyState | null = $state(null);
  let currentCommand = $state("");

  function setSelectedKey(key: KeyState) {
    selectedKey = key;
    currentCommand = key.command ?? "";
  }

  function saveCommand() {
    if (selectedKey) {
      const rowIndex = keyboardState.findIndex((row) =>
        row.some((key) => key.id === selectedKey!.id),
      );
      if (rowIndex !== -1) {
        const keyIndex = keyboardState[rowIndex].findIndex(
          (key) => key.id === selectedKey!.id,
        );
        const command = currentCommand.trim()
          ? currentCommand.trim()
          : undefined;
        keyboardState[rowIndex][keyIndex] = {
          ...keyboardState[rowIndex][keyIndex],
          command,
        };
      }
    }
    open = false;
    currentCommand = "";
  }
</script>

<main class="grid place-items-center min-h-screen font-mono">
  <Tooltip.Provider delayDuration={0}>
    <div class="inline-flex flex-col gap-y-1">
      <h1 class="text-4xl">keyfinder</h1>
      <Dialog.Root bind:open>
        {#each keyboardState as row}
          <div class="flex justify-between gap-x-1">
            {#each row as key}
              {#if key.id}
                <Dialog.Trigger onclick={() => setSelectedKey(key)}>
                  {#snippet child({ props: dialogProps })}
                    <Tooltip.Root>
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
                      <Tooltip.Content>{key.command}</Tooltip.Content>
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
