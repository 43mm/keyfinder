<script lang="ts">
  import { Dialog } from "bits-ui";
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

  function saveCommand() {
    if (selectedKey) {
      keyboardState.forEach((row, rowIndex) => {
        row.forEach((key, keyIndex) => {
          if (key.id === selectedKey?.id) {
            keyboardState[rowIndex][keyIndex] = {
              ...key,
              command: currentCommand,
            };
          }
        });
      });
    }
    open = false;
  }
</script>

<main class="grid place-items-center min-h-screen font-mono">
  <div class="inline-flex flex-col gap-y-1">
    <h1 class="text-4xl">keyfinder</h1>
    <Dialog.Root bind:open>
      {#each keyboardState as row}
        <div class="flex justify-between gap-x-1">
          {#each row as key}
            {#if key.id == undefined}
              <div class="" style="width: {key.length * 70}px;"></div>
            {:else}
              <Dialog.Trigger asChild let:builder>
                <button
                  use:builder.action
                  {...builder}
                  class="p-4 rounded text-s cursor-pointer hover:outline-2"
                  class:bg-gray-100={key.command == undefined}
                  class:bg-red-500={key.command}
                  class:text-left={key.alignLeft}
                  class:text-right={key.alignRight}
                  class:text-center={!key.alignLeft && !key.alignRight}
                  style="width: {key.length * 70}px;"
                  id={String(key.id)}
                >
                  {key.name}
                </button>
              </Dialog.Trigger>
            {/if}
          {/each}
        </div>
      {/each}
      <Dialog.Portal>
        <Dialog.Overlay class="fixed inset-0 z-50 bg-black/80" />
        <Dialog.Content
          class="fixed left-[50%] top-[50%] z-50 grid w-md max-w-lg translate-x-[-50%] translate-y-[-50%] bg-white p-6 rounded shadow"
          >Command</Dialog.Content
        >
      </Dialog.Portal>
    </Dialog.Root>
  </div>
</main>
