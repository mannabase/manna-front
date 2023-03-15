<template>
  <footer class="footer">
    <div class="footer__keep-me-updated">
      Keep Me Updated!
    </div>
    <div class="footer__news-paragraph">
      Interested in news and updates about Manna and related projects?Enter your e-mail to receive our occasional newsletter on project updates and news.
    </div>
    <div
        class="footer__news-email"
      >
        <input
          class="card__input card__one"
          placeholder="Enter your e-mail"
        />
      </div>
    <div class="footer__links">
      <a href="https://www.hedgeforhumanity.org/manna/" target="blank">About</a>
      <a href="https://discord.gg/HjHBYkfSfJ" target="blank">Discord</a>
      <a href="https://t.me/Manna_Currency" target="blank">Telegram</a>
      <a href="https://twitter.com/mannatoken" target="blank">Twitter</a>
      <!-- <a href="https://medium.com/@hedgeforhumanity" target="blank">Medium</a> -->
      <div v-if="isLinked && guidePage" class="link" @click="goToMannaOne()">Old Manna Claim</div>
    </div>
    <p class="footer__rights">All rights reserved @ 2021 Hedge for Humanity</p>
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
