<script>
  import SetLauncher from "./SetLauncher.svelte";
  import MiniCard from "./MiniCard.svelte";

  export let cards;

  let selected = [];
  let filteredIds = [];

  $: list = filteredIds.toString();
  $: disabled = filteredIds.length < 2;

  cards.forEach((cards, index) => {
    selected[index] = false;
  });

  const handleCheckChange = event => {
    const index = event.target.dataset.index;
    const value = event.target.dataset.value;
    if (selected[index]) {
      filteredIds = [...filteredIds, value];
    } else {
      filteredIds = filteredIds.filter(id => id != value);
    }
  };

  const handleMessage = event => {
    if (event.detail.text === "CLEAR_SELECTED_SET") {
      filteredIds = [];
      selected = selected.map(i => false);
    }
  };
</script>

<style>
  .harness {
    display: grid;
    grid-template-columns: 240px 1fr;
    grid-gap: 48px;
  }

  h4 {
    position: absolute;
    top: -20px;
    left: 4px;
    color: #9f9fad;
    display: flex;
    justify-content: space-between;
    right: 4px;
  }

  ul {
    display: grid;
    grid-column: 2/3;
    grid-auto-rows: 240px;
    grid-gap: 48px;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    list-style: none;
    margin: 0 0 100px;
    padding: 0;
    min-height: 100vh;
  }

  li {
    position: relative;
  }

  a {
    color: inherit;
    border-radius: 4px;
    box-shadow: var(--dropShadowLight);
    display: flex;
    flex-direction: column;
    height: 240px;
    overflow: hidden;
    position: relative;
    background: white;
    transition: box-shadow 150ms;
  }

  a:hover {
    box-shadow: 0 0 0 4px #0090ed;
  }

  .check-container {
    position: absolute;
    top: 8px;
    right: 8px;
  }
</style>

<div class="harness">
  <SetLauncher {list} {disabled} on:message={handleMessage} />
  <ul>
    {#each cards as card, index}
      <li>
        <a href={`/cards/${card.id}`}>
          <MiniCard {...card} />
        </a>
        <h4>
          <span>id: {card.id}</span>
          {#if card.widget}{card.widget} widget{/if}
        </h4>
        <div class="check-container">
          <input
            type="checkbox"
            bind:checked={selected[index]}
            on:change={handleCheckChange}
            data-index={index}
            data-value={card.id} />
          <span class="check" />
        </div>
      </li>
    {/each}
  </ul>
</div>
