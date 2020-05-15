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
  import PreviewGrid from "./../components/PreviewGrid.svelte";
  import Zap from "./../components/Zap.svelte";
  export let cards;
</script>

<style>
	div {
		margin: 24px auto;
		max-width: 1280px;
		width: 90%;
	}
  h1 {
    font-size: 20px;
    line-height: 24px;
    margin: 0 0 24px;
  }
</style>

<svelte:head>
  <title>Onboarding Machine</title>
</svelte:head>

<div>
	<h1>The <Zap zapId={1}>Onboarding</Zap> Machine.</h1>
	<PreviewGrid {cards} />
</div>
