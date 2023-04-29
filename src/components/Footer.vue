<template>
  <footer class="footer">
    <div class="footer__links">
      <a href="https://www.hedgeforhumanity.org/manna/" target="blank">About</a>
      <a href="https://discord.gg/HjHBYkfSfJ" target="blank">Discord</a>
      <a href="https://t.me/Manna_Currency" target="blank">Telegram</a>
      <a href="https://twitter.com/mannatoken" target="blank">Twitter</a>
      <a href="https://medium.com/@hedgeforhumanity" target="blank">Medium</a>
      <div
        class="link "
        :class="{ 'disable-link': !isLinked }"
        @click="goToMannaOne()"
      >
        Old Manna Claim
      </div>
    </div>
    <p class="footer__rights">All rights reserved @ 2020 Hedge for Humanity</p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      emailAddress: "",
    };
  },
};
</script>
