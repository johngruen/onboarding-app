<script>
  import Zap from "../Zap.svelte";
  import { fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  export let disabled = true;
  export let list = 0;
  export let surveyURL = '';
  let browser = false;

  const dispatch = createEventDispatcher();
  const dispatchClear = () => {
    dispatch("message", {
      text: "CLEAR_SELECTED_SET"
    });
  };

  const handleStartFlow = (evt) => {
    console.log('hsf', evt);
    const url = `/cards/${list}?${
      browser ? "browser" : ""
      }${surveyURL != '' ? `&survey=${surveyURL}` : ''}`;
    console.log(url);
    window.location = url;
  }

  console.log(list);
</script>

<style>
.set-launcher,
.instructions {
  position: fixed;
  width: 240px;
}
.set-launcher {
  display: grid;
  grid-gap: 4px;
  flex-direction: column;
  align-content: start;
}

.instructions {
  border: 3px dashed #ccc;
  padding: 24px;
  color: #9f9fad;
  border-radius: 3px;
}

h3 {
  margin-bottom: 16px;
}

p {
  color: #9f9fad;
}

p:last-child {
  margin: 0;
}

label {
  display: flex;
  flex-wrap: wrap;
}

.check-container {
  width: 32px;
  height: 32px;
  top: -8px;
}

.form {
  background: white;
  padding: 16px;
  border-radius: 4px;
  box-shadow: var(--dropShadowLight);
}

input[type="text"] {
  margin: 8px 0 16px;
  flex: 0 0 100%;
  font-size: 16px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #AFAFBA;
  transition: border 150ms;
}

input[type="text"]:focus {
  border: 1px solid #0060df;
  outline: 0;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.buttons button {
  flex: 0 0 48%;
  font-size: 14px;
}

</style>

{#if !disabled}
  <div class="set-launcher" in:fade="{{delay: 200, duration: 250}}">
    <h3>Your Flow&nbsp;↣ <Zap>{list}</Zap>
    </h3>
    <div class="form">
    <label>

      <div class="check-container">
      <input type="checkbox" bind:checked={browser} />
      <span class="check"></span>
      </div>
       Show Browser UI
    </label>
    <label>Add a survey URL
    <input type="text" placeholder="URL HERE" bind:value={surveyURL} /></label>
    <div class="buttons">
    <button class="secondary" on:click={dispatchClear}>Clear</button>
    <button on:click={handleStartFlow}>Make a flow</button>
    </div>
    </div>
  </div>
  {:else}
    <div class="instructions" in:fade="{{delay: 200, duration: 250}}">
      <h2>How to onboard&hellip;</h2>
      <p>Click a thumbnail to preview a card.</p>
      <p>Select two or more cards to build an onboarding flow.</p>
    </div>
{/if}