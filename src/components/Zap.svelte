<script>
  export let zapId = 1;
  export let content = "boilerplate";

  const validNum = () => {
    let num = parseInt(zapId);
    if (zapId >= 1 && zapId <= 9) return `0${num}`;
    else if (zapId >= 10 && zapId <= 18) return `${num}`;
    return "01";
  };

  const urlPath = `url(zaps/zap-${validNum()}.svg)`;
</script>

<style>
  .zap-wrap {
    position: relative;
  }

  .zap {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: block;
    height: 0.3em;
    left: -0.2em;
    position: absolute;
    top: calc(100% - 0.15em);
    width: calc(100% + 0.4em);
  }
</style>

<!--HACK: this is all one line b/c whitespace charaacters tend to leak through which creates chaos for the zap layout-->
<span class="zap-wrap">
  {#if content !== 'boilerplate'}
    {content}
  {:else}
    <slot />
  {/if}
  <span class="zap" style="background-image: {urlPath}" />
</span>
