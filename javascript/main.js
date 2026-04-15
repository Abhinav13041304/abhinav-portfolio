document.addEventListener("DOMContentLoaded", () => {

// animations.js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// cursor.js
function cursor() {
  const cursorObj = document.querySelector('.cursor');
  const cursorBorder = document.querySelector('.cursor__border');
  const anchors = document.querySelectorAll('a');

  if (cursorObj) {
    document.addEventListener('mousemove', (e) => {
      cursorObj.style.left = e.clientX + 'px';
      cursorObj.style.top = e.clientY + 'px';
    });

    document.addEventListener('click', (e) => {
      cursorObj.classList.add('click');
      setTimeout(() => {
        cursorObj.classList.remove('click');
      }, 200);
    });

    anchors.forEach((anchor) => {
      anchor.addEventListener('mouseover', () => {
        if (cursorBorder) cursorBorder.style.display = 'none';
        cursorObj.style.backgroundImage = 'none';
        cursorObj.style.transform = 'scale(2)';
        cursorObj.style.animationName = 'borderAnim';
        cursorObj.style.mixBlendMode = 'difference';
      });
      anchor.addEventListener('mouseleave', () => {
        if (cursorBorder) cursorBorder.style.display = 'block';
        cursorObj.style.backgroundImage = 'url(../assets/images/cursor.png)';
        cursorObj.style.transform = '';
        cursorObj.style.animationName = '';
        cursorObj.style.mixBlendMode = '';
      });
    });
  }
}

// hamburgerMenu.js
function showSidebar() {
  const sidebar = document.querySelector('.sidebar-mobile');
  const sidebarItems = document.querySelectorAll('.sidebar-mobile__item');
  const hamburger = document.querySelector('.nav__hamburger');
  const hamburgerIcon = document.querySelector('.nav__hamburger-icon');
  const closeIcon = document.querySelector('.nav__hamburger-close');
  const navbarMobile = document.querySelector('.nav__mobile');

  function toggleMenu() {
    if (sidebar.classList.contains('show-sidebar')) {
      if (navbarMobile) navbarMobile.style.background = "transparent";
      sidebar.classList.remove('show-sidebar');
      if (closeIcon) closeIcon.style.display = 'none';
      if (hamburgerIcon) hamburgerIcon.style.display = 'block';
    } else {
      if (navbarMobile) navbarMobile.style.background = "#0D0514";
      sidebar.classList.add('show-sidebar');
      if (closeIcon) closeIcon.style.display = 'block';
      if (hamburgerIcon) hamburgerIcon.style.display = 'none';
    }
  }

  function closeSideBarOnClickOutside(e) {
    if (
      !e.target.classList.contains('sidebar-mobile') &&
      sidebar && sidebar.classList.contains('show-sidebar') &&
      !e.target.classList.contains('nav__hamburger-icon')
    ) {
      toggleMenu();
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  if (sidebarItems) {
    sidebarItems.forEach((item) => {
      item.addEventListener('click', toggleMenu);
    });
  }

  document.addEventListener('click', (event) =>
    closeSideBarOnClickOutside(event)
  );
}

// intersectionObserver.js
const pages = ['hero', 'about', 'timeline', 'projects', 'skills', 'contact'];

function intersectionObserver() {
  var observer2 = new IntersectionObserver(
    function (entries) {
      if (entries[0].isIntersecting === true) {
        const activeLinkId = entries[0].target.id;
        document.querySelectorAll('.active-link').forEach((active) => {
          active.classList.remove('active-link');
        });
        if (activeLinkId === 'contact') {
          const el = document.querySelector('.mobile-' + activeLinkId);
          if (el) el.classList.add('active-link');
        } else {
          const desk = document.querySelector('.desktop-' + activeLinkId);
          const mob = document.querySelector('.mobile-' + activeLinkId);
          if (desk) desk.classList.add('active-link');
          if (mob) mob.classList.add('active-link');
        }
      }
    },
    { threshold: [0.2] }
  );

  pages.forEach((page) => {
    const pageSection = document.querySelector('#' + page);
    if (pageSection) {
      observer2.observe(pageSection);
    }
  });
}

// parallaxHero.js
function parallaxHero() {
  const background = document.querySelector('.background')
  const foreground = document.querySelector('.foreground');

  window.addEventListener('scroll', () => {
    let value = window.scrollY;
    if (background) background.style.top = value * 0.75 + 'px';
    // if (foreground) foreground.style.top = value * 0  + 'px';
  })
}

// sendEmail.js
const sendBtn = document.getElementById('sendButton');
const form = document.getElementById('sendForm');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const messageField = document.getElementById('message');
const formInfo = document.getElementById('form__info');
const formPopupTxt = document.getElementById('form__popup-txt');

if (form) {
    form.addEventListener('submit', sendEmail);
}

async function sendEmail(e) {
  e.preventDefault();
  if (formInfo) formInfo.classList.add('hide');
  if (sendBtn) sendBtn.value = 'Sending...';

  const serviceID = 'service_2tr2x4p';
  const templateID = 'template_k81pvtl';

  try {
    await emailjs.sendForm(serviceID, templateID, this);
    if (sendBtn) sendBtn.value = 'Send';
    if (nameField) nameField.value = '';
    if (emailField) emailField.value = '';
    if (messageField) messageField.value = '';
    if (formInfo) {
      formInfo.style.backgroundColor = 'rgb(0 113 12)';
      if (formPopupTxt) formPopupTxt.textContent = 'Email was successfully sent!';
      formInfo.classList.remove('hide');
    }
  } catch (err) {
    if (sendBtn) sendBtn.value = 'Send';
    if (formInfo) {
      formInfo.style.backgroundColor = '#8b1a09';
      if (formPopupTxt) formPopupTxt.textContent = 'Error sending email! Try again!';
      formInfo.classList.remove('hide');
    }
  }
}

// typeAnimation.js
function typeAnimation() {
  if (document.querySelector('#typed')) {
    new Typed('#typed', {
      stringsElement: '#typed-strings',
      smartBackspace: true,
      typeSpeed: 30,
      backSpeed: 30,
      loop: true,
    });
  }
}

// load.js
function load() {
  return new Promise((resolve) => {
    const container = document.querySelector('#container');
    const loader = document.querySelector('#loader');
    if (container) container.style.display = 'none';
    if (loader) loader.style.display = 'flex';
    setTimeout(() => {
      if (loader) loader.style.display = 'none';
      if (container) container.style.display = 'block';
      resolve();
    }, 1100);
  });
}

// index.js
async function main() {
  cursor();
  showSidebar();
  intersectionObserver();
  parallaxHero();
  if (typeof emailjs !== 'undefined') emailjs.init("YOUR_EMAILJS_KEY"); // Make sure this is fine, or omit if you don't have a key yet. 
  // Wait, emailjs needs a public key in .init() method or it gets picked up from <script>, but in index.js it was called as emailjs.init();
  await load();
  typeAnimation();
}

main();

});
