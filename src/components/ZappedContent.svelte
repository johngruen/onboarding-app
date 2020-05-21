<script>
  import Zap from "./Zap.svelte";
  export let content = "test header with <Zap>Zap</Zap>";
  export let zapId = "01";
  export let size = 48;
  export let height = 56;
  export let weight = 700;
  export let align = "center";
  const splitter = /<\/?Zap>/;
  const chunks = content.split(splitter);
  const style = `font-size: ${size}px; line-height: ${height}px; font-weight: ${weight}; text-align: ${align}`;
</script>

<style>
  div {
    max-width: 600px;
  }
</style>

<div {style}>
  {#if !content.includes('<Zap>')}
    {content}
  {:else}
    {#each chunks as chunk, i}
      {#if i === 1}
        <Zap content={chunk} {zapId} />
      {:else}{chunk}{/if}
    {/each}
  {/if}
</div>
