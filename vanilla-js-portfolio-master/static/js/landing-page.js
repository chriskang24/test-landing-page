const header = document.querySelector("header");
const fixedHeader = document.querySelector(".fixed-header");
const main = document.querySelector("main");
const nav = document.querySelector("nav");
const scrollButton = document.querySelector(".scroll-button");
const scrollElements = document.querySelectorAll('.scroll-in');
const topOfMain = main.getBoundingClientRect().top;
const projects = document.querySelectorAll('.project');
const inputs = document.querySelectorAll(".form-input");
const message = document.querySelector("#message");

header.classList.add('js-fixed');

scrollElements.forEach((el) => {
  el.classList.add('js-opacity');
})

const elementInViewport = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (elementTop <= ((window.innerHeight || document.documentElement.clientHeight) / dividend))
}

const elementOutOfView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (elementTop > (window.innerHeight || document.documentElement.clientHeight))
}

const handleHeaderScroll = () => {
  const headerBottomOffset = header.getBoundingClientRect().bottom;
  if (headerBottomOffset <= fixedHeader.clientHeight) {
    fixedHeader.classList.add('scrolled');
  } else {
    fixedHeader.classList.remove('scrolled');
  }
}

const handleVisibleNav = () => {
  // if scrolling past the initial landing
  if (elementInViewport(nav)) {
    nav.classList.add('visible');
    nav.classList.remove('hidden');
    // when toggled back to top
  } else if (nav.classList.contains('visible') && !elementInViewport(nav)) {
    nav.classList.remove('visible');
    nav.classList.add('hidden');
  }
}

const displayScrollElement = (element) => {
  element.classList.add('scrolled');
}

const hideScrollElement = (element) => {
  element.classList.remove('scrolled');
}

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInViewport(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutOfView(el)) {
      hideScrollElement(el);
    }
  })
}

const handleMessageCount = () => {
  let msg = document.getElementById("message").value;
  let msgCount = document.getElementById("message-count");
  let msgLength = msg.length;
  const maxLength = 1000;
  let charLeft = maxLength - msgLength;
  msgCount.innerText = charLeft;
}

message.addEventListener("input", handleMessageCount);

projects.forEach((el) => {
  el.addEventListener('click', () => {
    if (el.classList.contains('active')) {
      el.classList.remove('active');
    } else {
      el.classList.add('active');
    }
  })
})

// get top level parent element 
inputs.forEach((input) => {
  input.addEventListener("focus", (event) => {
    const parent = event.target.parentElement;
    parent.classList.add("focused");
  })
})

inputs.forEach((input) => {
  input.addEventListener("blur", (event) => {
    const parent = event.target.parentElement;
    if (!event.target.value) {
      parent.classList.remove("focused");
    }
  })
})

let throttleTimer;

const throttle = (callback, time) => {
  if (throttleTimer) return;

  throttleTimer = true;
  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
}

scrollButton.addEventListener("click", function () {
  window.scroll({ top: topOfMain, behavior: "smooth" })
});

const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

window.addEventListener("scroll", () => {
  handleHeaderScroll()
  handleVisibleNav()

  if (mediaQuery && !mediaQuery.matches) {
    throttle(handleScrollAnimation, 250);
  }
});

const contactMessage = document.querySelector('.success-message');

if (window.location.search.includes('success')) {
  contactMessage.innerHTML = "Thank you for your message, I'll get back to you as soon as I can!"
}
