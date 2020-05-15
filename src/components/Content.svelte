<script>
  export let browser = false;
  import Zap from "./Zap.svelte";
</script>

<style>

.browser,
.no-browser {
  display: flex;
  overflow-y: hidden;
  background: #f9f9fa;
}

.no-browser {
  height: 100vh;
  overflow: hidden;
  display: flex;
  width: 100%;
  justify-content: center;
}

.browser {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
}
</style>

{#if browser}
  <div class="browser">
    <slot></slot>
  </div>
  {:else}
    <div class="no-browser">
      <slot></slot>
    </div>
{/if}