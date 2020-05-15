<script>
  export let browser;
  import Chrome from "./Chrome.svelte";
  import Content from "./Content.svelte";
</script>

<style>
.browser {
  height: 90vh;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 5px 18px rgba(12,12,12,.2);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 90%;
  max-width: 1200px;
  border-radius: 8px;
}

.browser-content {
  flex: 1;
  background: hidden;
}

</style>


{#if browser}
  <div class="browser">
    <Chrome></Chrome>
    <div class="browser-content">
      <Content {browser}>
        <slot></slot>
      </Content>
    </div>
  </div>
  {:else}
    <Content {browser}>
      <slot></slot>
    </Content>
{/if}