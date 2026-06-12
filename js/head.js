function errorHandle() {
  try {
    var is_dev =
      window.location.href.indexOf('http://localhost') !== -1 ||
      window.location.href.indexOf('http://127.0.0.1') !== -1;
    window.addEventListener('error', function (event) {
      event.preventDefault();
      is_dev && console.error(event);
    });
    window.addEventListener('unhandledrejection', function (event) {
      event.preventDefault();
      is_dev && console.error(event);
    });
  } catch (e) {}
}

function printData() {
  try {
    console.log(
      '%c 如有疑问请联系邮箱 %c root@ltpp.vip %c ',
      'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
      'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
      'background:transparent'
    );
    console.log(
      '%c                   _oo0oo_                   \n                  o8888888o				     \n                  88" . "88				     \n                  (| -_- |)				     \n                   O\\ = /O				     \n' +
        "               ____/`---'\\____			     \n             .   ' \\\\| |// `.			     \n" +
        '              / \\\\||| : |||// \\				 \n           / _||||| -卍- |||||- \\		     \n              | | \\\\\\ - /// | |				 \n' +
        "            | \\_| ''\\---/'' | |				 \n" +
        '             \\ .-\\__ `-` ___/-. /			 \n' +
        "          ___`. .' /--.--\\ `. . __		     \n" +
        '       ."" "< `.___\\_<|>_/___. ` >" "".      \n      | | : `- \\`.;`\\ _ /`;.`/ - ` : | |     \n        \\ \\ `-. \\_ __\\ /__ _/ .-` / /        \n' +
        "======`-.____`-.___\\_____/___.-`____.-'======\n                   `=---='                   \n" +
        '.............................................\n      佛祖镇楼                  BUG辟易       \n',
      'background:#35495e ;  color: yellow'
    );
  } catch (e) {}
}

function setCookie() {
  try {
    document.cookie = 'SameSite=Lax; Secure; Max-Age=3153600000';
  } catch (e) {}
}

function redirectToLowerCaseUrl() {
  try {
    var parsedUrl = new URL(window.location.href);
    var lowerCaseUrl = (
      `${parsedUrl.protocol.toLowerCase()}//` +
      `${parsedUrl.hostname.toLowerCase()}` +
      (parsedUrl.port ? `:${parsedUrl.port}` : '') +
      `${parsedUrl.pathname.toLowerCase()}` +
      `${parsedUrl.search.toLowerCase()}` +
      `${parsedUrl.hash.toLowerCase()}`
    ).replace(/_/g, '-');
    if (window.location.href !== lowerCaseUrl) {
      window.location.href = lowerCaseUrl;
    }
  } catch (e) {}
}

function listenScroll() {
  try {
    var hasAdd = false;
    var progressBar = document.createElement('div');
    progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: var(--ltpp-top-scroll-height);
                background-color: var(--ltpp-top-scroll-color);
                z-index: 1000000000 !important;
            `;
    function updateScroll() {
      try {
        if (document.body && document.body.appendChild && !hasAdd) {
          document.body.appendChild(progressBar);
          hasAdd = true;
        }
        var scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        var scrollHeight = document.documentElement.scrollHeight;
        var clientHeight = document.documentElement.clientHeight;
        var progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        progressBar.style.width = `${progress}%`;
      } catch (e) {}
    }
    setInterval(updateScroll, 360);
    window.addEventListener('scroll', updateScroll);
  } catch (e) {}
}

function listenWheel() {
  try {
    window.addEventListener(
      'wheel',
      function (e) {
        e = e || window.event;
        if ((e.wheelDelta && event.ctrlKey) || e.detail) {
          event.preventDefault();
        }
      },
      {
        capture: false,
        passive: false,
      }
    );
  } catch (e) {}
}

function listenKeydown() {
  try {
    window.addEventListener('keydown', function (e) {
      if (e.ctrlKey && e.shiftKey) {
        e.preventDefault();
        return;
      }
      if (e.ctrlKey === true) {
        if (
          e.keyCode == 65 ||
          e.keyCode == 67 ||
          e.keyCode == 86 ||
          e.keyCode == 87 ||
          e.keyCode == 89 ||
          e.keyCode == 90 ||
          e.keyCode == 88
        ) {
          return;
        }
        e.preventDefault();
      }
      if (e.keyCode == 116 || e.keyCode == 123) {
        e.preventDefault();
      }
    });
  } catch (e) {}
}

function listenContextmenu() {
  try {
    window.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });
  } catch (e) {}
}

function listen() {
  try {
    listenWheel();
    listenKeydown();
    listenContextmenu();
    listenScroll();
  } catch (e) {}
}

function disableWarnLog() {
  console.warn = function () {};
}

function disableClickDom() {
  var processedElements = new WeakSet();

  function processNoClickElements() {
    var noClickElements = document.querySelectorAll(
      '.no-click:not([data-no-click-processed])'
    );
    noClickElements.forEach(function (element) {
      if (!processedElements.has(element)) {
        element.addEventListener(
          'click',
          function (event) {
            event.preventDefault();
            event.stopPropagation();
          },
          { passive: false }
        );
        element.addEventListener(
          'contextmenu',
          function (event) {
            event.preventDefault();
          },
          { passive: false }
        );
        element.addEventListener(
          'dragstart',
          function (event) {
            event.preventDefault();
          },
          { passive: false }
        );

        element.setAttribute('data-no-click-processed', 'true');
        processedElements.add(element);
      }
    });
  }

  function processSvgElements() {
    var svgElements = document.querySelectorAll('svg');
    svgElements.forEach(function (svg) {
      if (svg.hasAttribute('height')) {
        svg.removeAttribute('height');
      }
    });
  }

  if (typeof MutationObserver !== 'undefined') {
    var observer = new MutationObserver(function (mutations) {
      var shouldProcess = false;
      var shouldProcessSvg = false;

      mutations.forEach(function (mutation) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) {
              if (node.classList && node.classList.contains('no-click')) {
                shouldProcess = true;
              } else if (
                node.querySelector &&
                node.querySelector('.no-click')
              ) {
                shouldProcess = true;
              }

              if (node.tagName && node.tagName.toLowerCase() === 'svg') {
                shouldProcessSvg = true;
              } else if (
                node.querySelectorAll &&
                node.querySelectorAll('svg').length > 0
              ) {
                shouldProcessSvg = true;
              }
            }
          });
        } else if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class' &&
          mutation.target.classList.contains('no-click')
        ) {
          shouldProcess = true;
        }
      });

      if (shouldProcess) {
        processNoClickElements();
      }

      if (shouldProcessSvg) {
        processSvgElements();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      processNoClickElements();
      processSvgElements();
    });
  } else {
    processNoClickElements();
    processSvgElements();
  }

  var backupTimer = setInterval(function () {
    var unprocessedElements = document.querySelectorAll(
      '.no-click:not([data-no-click-processed])'
    );
    if (unprocessedElements.length > 0) {
      processNoClickElements();
    }

    processSvgElements();
  }, 10000);

  window.addEventListener('beforeunload', function () {
    if (backupTimer) {
      clearInterval(backupTimer);
    }
    if (observer) {
      observer.disconnect();
    }
  });
}

(function () {
  try {
    disableWarnLog();
    errorHandle();
    printData();
    setCookie();
    listen();
    redirectToLowerCaseUrl();
    disableClickDom();
  } catch (e) {}
})();
