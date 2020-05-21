<script>
  import Logo from "./Logo.svelte";
  import Button from "./Button.svelte";
  import ZappedContent from "./ZappedContent.svelte";
  import Theme from "./Widgets/Theme.svelte";
  import Importer from "./Widgets/Importer.svelte";
  import SignIn from "./Widgets/SignIn.svelte";
  export let headerContent = "Lorem Ipsum";
  export let zapId = "01";
  export let showZap = true;
  export let showLogo = true;
  export let showSkip = true;
  export let showSignIn = false;
  export let preview = false;
  export let skipText = "Not now";
  export let buttonText = "button Text";
  export let content = "";
  export let visible = true;
  export let browser = false;
  export let widget;

  const paddingTop = browser ? "padding-top: 24px" : "";

  import { createEventDispatcher } from "svelte";
  import { fly, fade, blur } from "svelte/transition";

  const dispatch = createEventDispatcher();

  const handleCardButtonClick = () => {
    dispatch("message", {
      text: "card button pushed"
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
    justify-content: center;
    padding: 80px 24px 24px;
    text-align: center;
    height: 100%;
  }

  .card + .card {
    display: none;
  }

  p {
    max-width: 610px;
  }

  .small {
    font-size: 14px;
    line-height: 22px;
    margin: 0;
  }

  .skip {
    cursor: pointer;
  }

  .account {
    position: absolute;
    top: 16px;
    right: 16px;
  }

  .account a,
  .skip {
    color: #0060df;
    text-decoration: underline;
  }
</style>

{#if visible}
  <div
    class="card"
    in:fade={{ duration: 500, delay: 500 }}
    out:fly={{ x: -100, y: 0, duration: 220 }}>
    <div class="card-content" style={paddingTop}>
      {#if showLogo}
        <Logo box={96} margin={24} />
      {/if}
      <ZappedContent {...{ zapId, showZap }} content={headerContent} />
      <p>
        <ZappedContent
          {...{ zapId, showZap }}
          {content}
          size={18}
          height={28}
          weight={400} />
      </p>
      {#if widget === 'theme'}
        <Theme />
      {:else if widget === 'importer'}
        <Importer />
      {:else if widget === 'auth'}
        <SignIn />
      {/if}
      <Button on:click={handleCardButtonClick}>{buttonText}</Button>
      {#if !preview}
        {#if showSignIn}
          <p out:fade={{ duration: 0, delay: 0 }} class="small account">
            Have an account?
            <a href="/fxa">Sign in</a>
          </p>
        {/if}
      {/if}
      {#if !showSignIn && showSkip}
        <p class="skip small" href="." on:click={handleCardButtonClick}>
          {skipText}
        </p>
      {/if}
    </div>
  </div>
{/if}
