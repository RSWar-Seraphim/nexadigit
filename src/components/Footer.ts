// ──────────────────────────────────────────
// src/components/Footer.ts
// ──────────────────────────────────────────
import { t } from './i18n'

/* Footer móvil y desktop comparten la clase `contact-animate`
   para heredar el mismo scroll-reveal definido en Contact.ts. */
export function FooterMobile() {
  return /* html */`
<footer class="contact-animate is-hidden
               sm:hidden w-full mt-16 pb-8
               text-[5px] font-montserrat font-semibold text-white">
  <div class="relative max-w-[500px] mx-auto flex items-center justify-between">
    <span>${t('footer_copy')}</span>

    <img data-link="home" src="/src/assets/fav-icon-logo.svg"
         class="cursor-pointer absolute left-1/2 -translate-x-1/2
                w-[15px] h-[15px] filter brightness-0 invert"
         alt="NexaDigit"/>

    <span class="flex gap-1.5">
      <a href="#" class="text-white hover:underline" data-legal="privacy">${t('footer_privacy')}</a>
      <a href="#" class="text-white hover:underline">${t('footer_terms')}</a>
      <a href="#" class="text-white hover:underline">${t('footer_cookie')}</a>
    </span>
  </div>
</footer>`
}

export function FooterDesktop() {
  return /* html */`
<footer class="contact-animate is-hidden
               hidden sm:block w-full mt-20 pt-10 pb-6
               text-[12px] font-montserrat font-semibold">
  <div class="max-w-[960px] mx-auto grid grid-cols-3 items-center">
    <span>${t('footer_copy')}</span>

    <img data-link="home" src="/src/assets/fav-icon-logo.svg"
         class="cursor-pointer justify-self-center
                w-[26px] h-[26px] filter brightness-0 invert"
         alt="NexaDigit"/>

    <span class="justify-self-end flex gap-6">
      <a data-legal="privacy" class="cursor-pointer">${t('footer_privacy')}</a>
      <a data-legal="terms"   class="cursor-pointer">${t('footer_terms')}</a>
      <a data-legal="cookie"  class="cursor-pointer">${t('footer_cookie')}</a>
    </span>
  </div>
</footer>`
}
