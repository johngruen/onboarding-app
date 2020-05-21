<script context="module">
  export async function preload({ query }) {
    const res = await this.fetch(
      `./api.json`
    );
    const data = await res.json();
    if (res.status === 200) {
      return { cards: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import PreviewGrid from "./../components/HarnessComponents/PreviewGrid.svelte";
  import { blur } from "svelte/transition";
  import Zap from "./../components/Zap.svelte";
  export let cards;
</script>

<style>
	.app-wrapper {
		margin: 0 auto 24px;
		max-width: 1280px;
		width: 90%;
  }

  header{
    position: fixed;
    top: 0;
    height: 64px;
    z-index: 2;
    background: var(--grey-10);
    display: flex;
    align-items: center;
    left: 0;
    right: 0;
  }

  .header-content {
    margin: 0 auto;
    max-width: 1280px;
		width: 90%;
  }

  h1 {
    font-size: 16px;
    line-height: 24px;
  }

  .pg-wrapper {
    margin-top: 72px;
  }

</style>

<svelte:head>
  <title>Onboarding Machine</title>
</svelte:head>

<div class="app-wrapper">
  <header>
    <div class="header-content">
    	  <h1 in:blur="{{duration: 200, delay: 200}}">The <Zap zapId={1}>Onboarding</Zap> Machine</h1>
    </div>

  </header>
  <div class="pg-wrapper"><PreviewGrid {cards} /></div>
</div>
