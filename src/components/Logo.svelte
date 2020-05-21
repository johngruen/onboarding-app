<script>
  export let box = 96;
  export let margin = 24;
  $: cssMargin = `${margin}px`;
</script>

<style>
  img {
    margin: var(--margin);
  }
</style>

<img
  width={box}
  height={box}
  style="margin-bottom: {cssMargin}"
  src="browser-icon.svg"
  alt="logo" />
