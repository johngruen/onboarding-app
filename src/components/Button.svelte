<script>
  export let type = "primary";
  export let size = "large";
</script>

<style>
  button {
    font-weight: 700;
    font-family: metropolis;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .large {
    height: 48px;
    padding: 24px;
    border-radius: 4px;
    margin: 24px 0;
  }

  .primary {
    color: #fff;
    background: #0060df;
    border: 0;
    font-size: 16px;
    transition: background 75ms;
  }

  .primary:hover {
    background: #0250bb;
  }

  .primary:active {
    background: #073072;
  }
</style>

<button class="{type} {size}" on:click>
  <slot />
</button>
