<template>
  <footer class="footer">
    <h3 class="footer__keep-me-updated">Keep Me Updated!</h3>
    <p class="footer__news-paragraph">
      Interested in news and updates about Manna and related projects? Enter
      your email to<br />receive our occasional newsletter on project updates
      and news.
    </p>

    <div class="footer__news-email">
      <input
        class="footer__news-email__input"
        type="email"
        placeholder="Enter your e-mail"
      />
      <button class="footer__news-email__submit">SUBMIT</button>
    </div>

    <div class="footer__links">
      <a href="https://www.hedgeforhumanity.org/manna/">About</a>
      <a href="https://discord.gg/HjHBYkfSfJ">Discord</a>
      <a href="https://t.me/Manna_Currency">Telegram</a>
      <a href="https://twitter.com/H4HFund">Twitter</a>

      <div class="footer__links__hedge-for-humanity">
        <img
          src="@/assets/images/h.png"
          alt=""
          class="footer__links__hedge-for-humanity__image"
        />
        <span class="footer__links__hedge-for-humanity__text"
          ><h3>Hedge for<br />Humanity</h3></span
        >
      </div>
    </div>
    <p class="footer__rights">All rights reserved @ 2020 Hedge for Humanity</p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>
