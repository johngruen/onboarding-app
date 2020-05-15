<script>
  export let cards;

  import Card from "./Card.svelte";
  import Zap from "./Zap.svelte";
  import { fly } from "svelte/transition";

  let selected = [];
  let filteredIds = [];
  let surveyURL;
  let browser;

  $: showAdmin = filteredIds.length > 0;
  $: idString = filteredIds.toString();

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

  const handleAdminButtonClick = event => {
    const url = `/cards/${idString}?${browser ? 'browser' : ''}&survey=${surveyURL}`;
    window.location = url;
  };

  const clearSelection = event => {
    filteredIds = [];
    selected = selected.map(i => false);
  }
</script>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-auto-rows: 240px;
    grid-gap: 32px;
    list-style: none;
    margin: 0 0 100px;
    padding: 0;
  }

  .select-wrapper {
    position: relative;
  }

  .grid h2 {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 16px;
  }

  .card-preview-wrapper {
    box-shadow: 0 5px 18px rgba(12, 12, 13, 0.1),
      0 0 0 1px rgba(12, 12, 13, 0.05);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    height: 240px;
    overflow: hidden;
    position: relative;
  }

  input[type="checkbox"] {
    border-radius: 50%;
    height: 32px;
    width: 32px;
    margin: 0;
    padding: 0;
  }

  input[type="text"] {
    margin-top: 10px;
    padding: 10px;
    font-size: 16px;
    border-radius: 2px;
    border: 1px solid #ccc;
    display: block;
  }

  .grid input {
    position: absolute;
    right: 6px;
    top: 6px;
    z-index: 1;
  }

  .admin {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 -5px 18px rgba(12, 12, 13, 0.1);
    padding: 24px;
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 1;
  }

  .admin h3 {
    margin-bottom: 8px;
  }

  label {
    display: flex;
    align-items: center;
    margin-top: 16px;
    font-weight: bold;
  }

  button {
    font-weight: 700;
    font-family: metropolis;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 24px;
    border-radius: 4px;
    margin: 24px 0 0;
    color: #fff;
    background: #0060df;
    border: 0;
    font-size: 16px;
    transition: background 75ms;
  }

  button:hover {
    background: #0250bb;
  }

  button:active {
    background: #073072;
  }

  p {
    font-size: 12px;
    color: rgb(173, 16, 16);
    cursor: pointer;
    margin-bottom: 0;
    font-weight: bold;
  }
</style>

<ul class="grid">
  {#each cards as card, i}
    <div class="select-wrapper">
      <a rel="prefetch" href={`/cards/${card.id}`}>
        <div class="card-preview-wrapper">
          <Card {...card} preview={true} />
        </div>
      </a>
      <input
        type="checkbox"
        bind:checked={selected[i]}
        on:change={handleCheckChange}
        data-index={i}
        data-value={card.id} />
      <h2>ID: {card.id}</h2>
    </div>
  {/each}
</ul>

{#if showAdmin}
  <div class="admin" transition:fly={{ y: 200, duration: 250 }}>
    <h3>
      IDs Selected:
      <Zap>
        {idString}
      </Zap>
    </h3>

    <label>
      Show Browser UI:
      <input type="checkbox" bind:checked={browser} />
    </label>
    <label>Add a survey URL</label>
    <input type="text" placeholder="add a url" bind:value={surveyURL} />
    <button on:click={handleAdminButtonClick}>Make me a flow!</button>
    <p on:click={clearSelection}>Clear selection</p>
  </div>
{/if}
