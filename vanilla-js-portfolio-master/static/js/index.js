const root = document.querySelector('html');
const body = document.querySelector('body');
const mainNav = document.querySelector("nav");
const menu = document.querySelector('.nav-links');
const menuButton = document.getElementById('menu-display');
const themeDisplay = document.getElementById('theme-display');
const themeContainer = document.querySelector('.theme-container');
const themeSelectors = document.getElementsByClassName('theme-select');

// console.log('root', root);

mainNav.classList.add('js-nav');

const getTheme = () => {
  const theme = localStorage.getItem('theme');
  theme && setActiveSelector(theme);
  root.className = theme;
}

const setTheme = (className) => {
  root.className = '';
  root.classList.add(className);

  setActiveSelector(className);
  localStorage.setItem('theme', className);
}

const setActiveSelector = (className) => {
  let selectedTheme = document.getElementById(`${className}-select`);
  [...themeSelectors].forEach(item => {
    item.classList.remove('active')
  });
  selectedTheme.classList.add('active');
  hideThemeContainer()
}

const showThemeContainer = () => {
  themeContainer.classList.add('visible');
  [...themeSelectors].forEach(item => {
    item.tabIndex = 0;
  });

}

const hideThemeContainer = () => {
  themeContainer.classList.remove('visible');
  [...themeSelectors].forEach(item => {
    item.tabIndex = -1;
  })

}

const showMenu = () => {
  menu.classList.add('visible');
  menuButton.classList.add('active');
}

const hideMenu = () => {
  menu.classList.remove('visible');
  menuButton.classList.remove('active');
}

let previousScrollPosition = 0;

const isScrollingDown = () => {
  let scrolledPosition = window.scrollY;
  let isScrollDown;

  scrolledPosition > previousScrollPosition ? isScrollDown = true : isScrollDown = false;

  previousScrollPosition = scrolledPosition;
  return isScrollDown;
}

const handleNavScroll = () => {
  if (mainNav.classList.contains('visible')) {
    if (isScrollingDown()) {
      mainNav.classList.add('scroll-down');
      mainNav.classList.remove('scroll-up');
    } else {
      mainNav.classList.add('scroll-up');
      mainNav.classList.remove('scroll-down');
    }
  } else {
    mainNav.classList.remove('scroll-up');
    mainNav.classList.remove('scroll-down');
  }
}

// getTheme() can be loaded without event listener
window.addEventListener('load', () => {
  getTheme()
})

// Toggle theme settings
themeDisplay.addEventListener('click', function () {
  hideMenu()
  themeContainer.classList.contains('visible') ? hideThemeContainer() : showThemeContainer()
})

// Toggle NAV Options on mobile
menuButton.addEventListener('click', function () {
  hideThemeContainer()
  menu.classList.contains('visible') ? hideMenu() : showMenu();
})

menu.addEventListener("click", function() {
  hideThemeContainer()
  hideMenu()
})

window.addEventListener('scroll', () => {
  handleNavScroll()
})
