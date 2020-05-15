<script>
  import Card from "./Card.svelte";
  export let set = [];
  export let browser = false;
  export let survey = '';

  let length = set.length;
  set[0].showSignIn = true;
  let shown = 0;


  import { fly, fade, blur } from "svelte/transition";

  function handlePipClick(event) {
    const clicked = parseInt(event.target.dataset.index, 10);
    if (shown !== clicked) shown = clicked;
  }

  function handleMessage(event) {
    if (event.detail.text === "card button pushed") {
      if(shown < length - 1) {
        shown += 1;
      }
      else if (shown === length - 1) {
        if (survey !== '' && survey != "undefined") window.location = survey;
        else window.location = "/done";
      }
    }
  }
</script>

<style>
  .set {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .card-block {
    flex: 1;
    display: block;
    height: 100%;
    overflow: hidden;
  }

  .pips {
    display: flex;
    position: relative;
    flex: 0 0 40px;
    align-items: top;
    justify-content: center;
  }

  .pip {
    height: 4px;
    flex: 0 0 60px;
    border-radius: 2px;
    margin: 4px;
    background: #E0E0E6;
  }
  .pip.active {
    background: #80808F
  }
</style>

<div class="set">
  <div class="card-block" in:fade="{{duration: 500, delay:250}}">
    {#each set as card, i}
      {#if i === shown}
        <Card {...card} {browser} on:message={handleMessage} visible={true} />
      {:else}
        <Card {...card} {browser} on:message={handleMessage} visible={false} />
      {/if}
    {/each}
  </div>
  <div class="pips">
    {#each set as card, i}
      {#if i === shown}
        <div class="pip active"  on:click={handlePipClick} data-index={i}></div>
        {:else}
          <div class="pip"  on:click={handlePipClick} data-index={i}></div>
      {/if}
    {/each}
  </div>
</div>
