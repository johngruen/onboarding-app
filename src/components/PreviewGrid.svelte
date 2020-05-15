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

  const handleAdminButtonClick = event => {
    const url = `/cards/${idString}?${
      browser ? "browser" : ""
    }&survey=${surveyURL}`;
    window.location = url;
  };

  const clearSelection = event => {
    filteredIds = [];
    selected = selected.map(i => false);
  };
</script>

<style>
  .grid {
    display: grid;
    grid-auto-rows: 240px;
    grid-gap: 32px;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    list-style: none;
    margin: 0 0 100px;
    padding: 0;
  }

  .select-wrapper {
    position: relative;
  }

  .grid h2 {
    font-size: 16px;
    left: 10px;
    position: absolute;
    top: 10px;
  }

  .card-preview-wrapper {
    border-radius: 4px;
    box-shadow: 0 5px 18px rgba(12, 12, 13, 0.1), 0 0 0 1px rgba(12, 12, 13, 0.05);
    display: flex;
    flex-direction: column;
    height: 240px;
    overflow: hidden;
    position: relative;
  }

  input[type="checkbox"] {
    border-radius: 50%;
    height: 32px;
    margin: 0;
    padding: 0;
    width: 32px;
  }

  input[type="text"] {
    border-radius: 2px;
    border: 1px solid #ccc;
    display: block;
    font-size: 16px;
    margin-top: 10px;
    padding: 10px;
  }

  .grid input {
    position: absolute;
    right: 6px;
    top: 6px;
    z-index: 1;
  }

  .admin {
    background: rgba(255, 255, 255, 0.98);
    bottom: 0;
    box-shadow: 0 -5px 18px rgba(12, 12, 13, 0.1);
    padding: 24px;
    position: fixed;
    right: 0;
    z-index: 1;
  }

  .admin h3 {
    margin-bottom: 8px;
  }

  label {
    align-items: center;
    display: flex;
    font-weight: bold;
    margin-top: 16px;
  }

  button {
    align-items: center;
    background: #0060df;
    border-radius: 4px;
    border: 0;
    color: #fff;
    display: flex;
    font-family: metropolis;
    font-size: 16px;
    font-weight: 700;
    height: 48px;
    justify-content: center;
    margin: 24px 0 0;
    padding: 24px;
    transition: background 150ms;
  }

  button[disabled] {
    opacity: .25;
    background: #999;
  }

  button:hover:not[disabled] {
    background: #0250bb;
  }

  button:active:not[disabled] {
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
      <Zap>{idString}</Zap>
    </h3>

    <label>
      Show Browser UI:
      <input type="checkbox" bind:checked={browser} />
    </label>
    <label>Add a survey URL</label>
    <input type="text" placeholder="URL HERE" bind:value={surveyURL} />
    <button on:click={handleAdminButtonClick} {disabled}>Make me a flow!</button>
    <p on:click={clearSelection}>Clear selection</p>
  </div>
{/if}
