<script>
  import Logo from "./Logo.svelte";
  import Button from "./Button.svelte";
  import Header from "./Header.svelte";
  export let headerContent = "Lorem Ipsum";
  export let zapId = "01";
  export let showZap = true;
  export let showLogo = true;
  export let showSkip = false;
  export let showSignIn = false;
  export let preview = false;
  export let skipText = "Skip"
  export let buttonText = "button Text"
  export let content = '';
  export let visible = true;
  export let browser = false;
  export let widget;

  const paddingTop = browser ? "padding-top: 24px" : ""

  const scale = preview ? "transform: scale(50%)" : '';

  import { createEventDispatcher } from "svelte";
  import { fly, fade, blur } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  const handleCardButtonClick = () => {
    dispatch("message", {
      text: 'card button pushed'
    });
  };
</script>

<style>
  .card {
    display: block;
    height: 100%;
    max-width: 780px;
    transform-origin: center -40px;
  }

  .card-content {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 120px 24px 24px;
    text-align: center;
  }

  p {
    max-width: 610px;
  }

  .small {
    font-size: 14px;
    line-height: 22px;
    margin: 0;

  }

  a.skip {
    font-size: 14px;
    line-height: 22px;
    color: #80808f;
    display: block;
    margin: 40px;
  }

  .theme {
    background: url(../themes.png) no-repeat center center;
    width: 639.5px;
    height: 167.5px;
    background-size: cover;
  }
</style>

{#if visible}
    <div class="card" style={scale}>
    <div class="card-content" style={paddingTop} in:fade="{{duration: 500, delay: 200}}" out:fly="{{x: -100, duration: 250}}">
      {#if showLogo}
        <Logo box={96} margin={24} />
      {/if}
      <Header {...{headerContent, zapId, showZap}} />
      {#if content}
        {@html content}
        {#if widget === "theme"}
          <div class="theme"></div>
        {/if}
      {:else}
        <slot></slot>
      {/if}
      <Button on:click={handleCardButtonClick}>{buttonText}</Button>
      {#if !preview}
        {#if showSignIn && !preview}
          <p class="small">Already have an account? <a href="/fxa">Sign in</a></p>
        {/if}
      {/if}
    </div>
    {#if showSkip && !preview}
      <a class="skip" href=".">{skipText}</a>
    {/if}
  </div>
{/if}
