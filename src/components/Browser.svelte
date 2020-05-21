<script>
  export let browser;
  import Chrome from "./Chrome.svelte";
  import Content from "./Content.svelte";
</script>

<style>
  .browser-wrapper {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    background: url(../rigi.jpg);
    background-size: cover;
  }

  .browser {
    height: 90vh;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 5px 18px rgba(12, 12, 12, 0.25),
      0 0 0 2px rgba(12, 12, 13, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 90%;
    max-width: 1200px;
    border-radius: 4px;
  }

  .browser-content {
    flex: 1;
    background: hidden;
  }
</style>

<div class="browser-wrapper">
  <div class="browser">
    <Chrome />
    <div class="browser-content">
      <Content {browser}>
        <slot />
      </Content>
    </div>
  </div>
</div>
