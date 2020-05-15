<script context="module">
	export async function preload({query}) {
		const res = await this.fetch(`./api.json?ids=${query.ids}&browser=${query.browser}`);
		const data = await res.json();
		if (res.status === 200) {
			return { cards: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	import CardPreviewGrid from './../components/CardPreviewGrid.svelte';
	import Zap from './../components/Zap.svelte'
	export let cards;
</script>

<style>
	h1 {
		font-size: 24px;
		line-height: 32px;
		margin: 0 0 32px;
	}

	div {
		min-height: 100vh;
		padding: 24px;
		max-width: 1280px;
		width: 90%;
		margin: 0 auto;
	}
</style>

<div>
	<h1>The <Zap zapId={1}>Onboarding</Zap> Machine</h1>
	<CardPreviewGrid {cards} />
</div>


