<script context="module">
	export async function preload({params, query}) {
		const res = await this.fetch(`./api/${params.slug}.json`);
		const data = await res.json();
		const browser = typeof query.browser === 'string' ? true : false;
		const surveyURL = query.survey;
		if (res.status === 200) {
			return { data, browser, surveyURL };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let data;
	export let browser;
	export let surveyURL;
  import { fly } from "svelte/transition";
	import Browser from "../../components/Browser.svelte";
	import Content from "../../components/Content.svelte";
	import Card from "../../components/Card.svelte";
	import Set from "../../components/Set.svelte";
	const {cards} = data;
</script>

<style>
a {
	position: absolute;
	color: black;
	display: block;
	left: 20px;
	padding: 8px 16px;
	box-shadow: 0 5px 18px rgba(12, 12, 13, .2);
	transition: background 75ms;
}

a:hover {
	background: rgba(12, 12, 13, .05);
}

.singleton-wrapper {
	margin: 0 auto;
}
</style>

<svelte:head>
  <title>Welcome to Firefox</title>
</svelte:head>

{#if browser}
	<Browser {browser}>
		{#if cards.length > 1}
			<Set set={cards} {browser} survey={surveyURL} on:message/>
		{:else}
			<a href="/" out:fly="{{duration: 200, y: -40}}">&larr; home</a>
			<div class="singleton-wrapper">
				<Card {...cards[0]} {browser}/>
			</div>
		{/if}
	</Browser>
	{:else}
	<Content>
		{#if cards.length > 1}
			<Set set={cards} {browser} survey={surveyURL} on:message/>
		{:else}
			<a href="/" out:fly="{{duration: 200, y: -40}}">&larr; home</a>
			<div class="singleton-wrapper">
				<Card {...cards[0]} {browser}/>
			</div>
		{/if}
	</Content>
{/if}