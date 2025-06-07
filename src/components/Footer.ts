// ──────────────────────────────────────────
// src/components/Footer.ts
// ──────────────────────────────────────────

import { t } from './i18n'

export function FooterMobile() {
  return /* html */ `
    <footer role="contentinfo" aria-label="Site footer"
            class="contact-animate is-hidden
                   sm:hidden w-full mt-16 pb-8
                   text-[5px] font-montserrat font-semibold text-white">
    
      <div class="relative max-w-[500px] mx-auto flex items-center justify-between">
    
        <span>${t('footer_copy')}</span>
    
        <!-- logo / back-to-top -->
        <a data-link="home" href="#home"
           aria-label="${t('footer_back_home')}"
           class="absolute left-1/2 -translate-x-1/2 inline-block">
          <img src="/assets/fav-icon-logo.svg"
               class="w-[15px] h-[15px] filter brightness-0 invert"
               alt="NexaDigit logo" />
        </a>
    
        <!-- enlaces legales -->
        <span class="flex gap-1.5">
          <a href="/privacy"  data-legal="privacy">${t('footer_privacy')}</a>
          <a href="/terms"     data-legal="terms">${t('footer_terms')}</a>
          <a href="/cookies"   data-legal="cookie">${t('footer_cookie')}</a>
        </span>
      </div>
    </footer>`;
}

export function FooterDesktop() {
  return /* html */ `
    <footer role="contentinfo" aria-label="Site footer"
            class="contact-animate is-hidden
                   hidden sm:block w-full mt-20 pt-10 pb-6
                   text-[10px] font-montserrat font-semibold">
    
      <div class="max-w-[960px] mx-auto grid grid-cols-3 items-center">
    
        <span>${t('footer_copy')}</span>
    
        <!-- logo / back-to-top -->
        <a data-link="home" href="#home"
           aria-label="${t('footer_back_home')}"
           class="justify-self-center inline-block">
          <img src="/assets/fav-icon-logo.svg"
               class="w-[26px] h-[26px] filter brightness-0 invert"
               alt="NexaDigit logo" />
        </a>
    
        <!-- enlaces legales -->
        <span class="justify-self-end flex gap-6">
          <a href="/privacy"  data-legal="privacy">${t('footer_privacy')}</a>
          <a href="/terms"    data-legal="terms">${t('footer_terms')}</a>
          <a href="/cookies"  data-legal="cookie">${t('footer_cookie')}</a>
        </span>
      </div>
    </footer>`;
    }

