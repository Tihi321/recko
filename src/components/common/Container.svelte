<div class="container">
  <div class="container-inner">
    <slot />
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    justify-content: center;
    padding: 24px;
    min-height: 100vh;
  }

  .container-inner {
    width: 100%;
    max-width: 1284px;
  }
</style>
