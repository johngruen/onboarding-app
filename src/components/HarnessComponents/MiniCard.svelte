<script>
  import Logo from "../Logo.svelte";
  import ZappedContent from "../ZappedContent.svelte";

  export let widget = undefined;
  export let buttonText = "button Text"
  export let content = '';
  export let headerContent = "Lorem Ipsum"
  export let showLogo = true;
  export let showZap = true;
  export let zapId = "01";
  let active = true;
</script>

<style>
.mini-card {
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 16px;
}

p {
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  margin-top: 8px;
}

img {
  margin: -10px 0 10px;
}

input {
  max-height: 32px;
}
</style>

<div class="mini-card" {active}>
  {#if showLogo}<Logo box="48" margin="8" />{/if}
  <ZappedContent size={24} height={32} content={headerContent} {...{zapId, showZap}}/>
  <p><ZappedContent size={12} height={18} content={content} weight={400} {...{zapId, showZap}}/></p>
  {#if widget === "theme"}
    <img src="../themes.png" alt="themes" width="100%"/>
  {/if}
  {#if widget === "importer"}
    <img src="../importer.png" alt="themes" width="100%"/>
  {/if}
  {#if widget === "auth"}
    <input type="text" placeholder="enter your email">
  {/if}
  <button disabled>{buttonText}</button>
</div>
