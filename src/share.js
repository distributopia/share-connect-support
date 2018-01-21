
'use strict';

document.addEventListener('DOMContentLoaded', function() {

  const h1 = document.querySelector('h1');
  const postTitle = document.querySelector('head').querySelector('title');
  const oggProp = document.querySelector('meta[property="og:title"]');

  const t1 = (postTitle === null) ? '' : postTitle.textContent,
        t2 = (oggProp === null) ? '' : oggProp.content,
        t3 = (h1 === null) ? '' : h1.textContent;

  const text = t1 || t2 || t3;

  const link = encodeURIComponent(window.location.href);

  const btnsNodeList = document.querySelectorAll('.share-btn');

  const buttons = [];
  for (let i = 0; i < btnsNodeList.length; i++) {
    buttons.push(btnsNodeList[i])
  }

  const inputsNodeList = document.querySelectorAll('.popup input');

  const inputs = [];
  for (let i = 0; i < inputsNodeList.length; i++) {
    inputs.push(inputsNodeList[i])
  }

  // If url was typed without https://, add it
  function validateProtocol(url) {
    const check = url.match(/^https:\/\//i);
    if (check) {
      return url;
    } else {
      const newUrl = url.split('/').filter((n) => n.indexOf('.') > -1);
      return `https://${encodeURIComponent(newUrl)}`;
    }
  }

  const shareLink = function(e) {
    const isBtn = (e.target.name !== 'podurl');
    const service = isBtn ? e.target.value : e.target.nextSibling.value;
    const pod = isBtn ? e.target.previousSibling.value : e.target.value;
    const title = encodeURI(text).replace(/%20/g, '+');
    const path = validateProtocol(pod);

    if (service === 'diaspora' || service === 'friendica' || service === 'socialhome') {
      window.open(`${path}/bookmarklet?url=${link}&title=${title}`);
    } else if (service === 'gnusocial') {
      window.open(`${path}/notice/new?status_textarea=${title}&${link}`);
    } else if (service === 'mastodon') {
      window.open(`${path}/share?text=${title} ${link}`);
    } else if (service === 'hubzilla') {
      window.open(`${path}/rpost?f=&url=${link}&title=${title}`);
    } else {
      return;
    }
  };

  buttons.forEach((btn) => btn.addEventListener('click', shareLink, false));

  // shareLink on Enter press
  inputs.forEach((input) => input.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {shareLink(e)}
  }));
});
