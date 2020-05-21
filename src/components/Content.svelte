<script>
  export let browser = false;
</script>

<style>
  .browser,
  .no-browser {
    display: flex;
    overflow: hidden;
    background: #f9f9fa;
    position: relative;
    justify-content: center;
  }

  .no-browser {
    height: 100vh;
    width: 100vw;
  }

  .browser {
    height: 100%;
    width: 100%;
  }
</style>

<!--
  Sets Slightly different CSS for the parent depending
  if card is rendered inside or outside of the fake
  browser harness
-->
{#if browser}
  <div class="browser">
    <slot />
  </div>
{:else}
  <div class="no-browser">
    <slot />
  </div>
{/if}
