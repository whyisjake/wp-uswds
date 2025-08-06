<?php
/**
 * Title: USWDS Extended Header
 * Slug: uswds/header-extended
 * Categories: uswds, header
 * Keywords: header, navigation, government, extended
 * Description: Extended government website header with logo, tagline, navigation, and search
 */
?>

<!-- wp:wp-uswds/header {"variant":"extended","siteName":"Agency Name","siteTagline":"Tagline describing agency's mission","showSearch":true,"navItems":[{"label":"Home","url":"/","current":true},{"label":"About","url":"/about","current":false},{"label":"Services","url":"/services","current":false},{"label":"Resources","url":"/resources","current":false},{"label":"Contact","url":"/contact","current":false}]} -->
<header class="usa-header usa-header--extended"><div class="usa-nav-container"><div class="usa-navbar"><div class="usa-logo" id="extended-logo"><em class="usa-logo__text"><a href="/" title="Agency Name">Agency Name</a></em></div><button type="button" class="usa-menu-btn">Menu</button></div><div class="usa-logo__tagline">Tagline describing agency's mission</div><nav aria-label="Primary navigation" class="usa-nav"><button type="button" class="usa-nav__close"><img src="/wp-content/themes/uswds-theme/assets/images/usa-icons/close.svg" role="img" alt="Close"/></button><ul class="usa-nav__primary usa-accordion"><li class="usa-nav__primary-item usa-current"><a class="usa-nav__link" href="/">Home</a></li><li class="usa-nav__primary-item"><a class="usa-nav__link" href="/about">About</a></li><li class="usa-nav__primary-item"><a class="usa-nav__link" href="/services">Services</a></li><li class="usa-nav__primary-item"><a class="usa-nav__link" href="/resources">Resources</a></li><li class="usa-nav__primary-item"><a class="usa-nav__link" href="/contact">Contact</a></li></ul><div class="usa-nav__secondary"><form class="usa-search usa-search--small"><div role="search"><label class="usa-sr-only" for="search-field">Search</label><input class="usa-input" id="search-field" type="search" name="search" placeholder="Search"/><button class="usa-button" type="submit">Search</button></div></form></div></nav></div></header>
<!-- /wp:wp-uswds/header -->