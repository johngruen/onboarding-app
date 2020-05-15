<script>
  import Zap from "./Zap.svelte";
  export let headerContent = "test header with <Zap>Zap</Zap>";
  export let zapId = "01";
  const splitter = /<\/?Zap>/
  const chunks = headerContent.split(splitter);
</script>


<style>
  h1 {
    font-size: 48px;
    line-height: 56px;
    color: #20133a;
    max-width: 600px;
  }
</style>

<h1>
  {#if !headerContent.includes("<Zap>") }
    {headerContent}
  {:else}
    {#each chunks as chunk, i}
      {#if i === 1}
        <Zap content={chunk} {zapId} />
      {:else}
        {chunk}
      {/if}
    {/each}
  {/if}
</h1>
