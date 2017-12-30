
'use strict';

document.addEventListener('DOMContentLoaded', function () {

  var h1 = document.querySelector('h1');
  var postTitle = document.querySelector('head').querySelector('title');
  var oggProp = document.querySelector('meta[property="og:title"]');

  var t1 = postTitle === null ? '' : postTitle.textContent,
      t2 = oggProp === null ? '' : oggProp.content,
      t3 = h1 === null ? '' : h1.textContent;

  var text = t1 || t2 || t3;

  var link = encodeURIComponent(window.location.href);

  var btnsNodeList = document.querySelectorAll('.share-btn');

  var buttons = [];
  for (var i = 0; i < btnsNodeList.length; i++) {
    buttons.push(btnsNodeList[i]);
  }

  var inputsNodeList = document.querySelectorAll('.popup input');

  var inputs = [];
  for (var _i = 0; _i < inputsNodeList.length; _i++) {
    inputs.push(inputsNodeList[_i]);
  }

  // If url was typed without https://, add it
  function validateProtocol(url) {
    var check = url.match(/^https:\/\//i);
    if (check) {
      return url;
    } else {
      var newUrl = url.split('/').filter(function (n) {
        return n.indexOf('.') > -1;
      });
      return 'https://' + encodeURIComponent(newUrl);
    }
  }

  var shareLink = function shareLink(e) {
    var isBtn = e.target.name !== 'podurl';
    var service = isBtn ? e.target.value : e.target.nextSibling.value;
    var pod = isBtn ? e.target.previousSibling.value : e.target.value;
    var title = encodeURI(text).replace(/%20/g, '+');
    var path = validateProtocol(pod);

    if (service === 'diaspora' || service === 'friendica' || service === 'socialhome') {
      window.open(path + '/bookmarklet?url=' + link + '&title=' + title);
    } else if (service === 'gnusocial') {
      window.open(path + '/notice/new?status_textarea=' + title + '&' + link);
    } else if (service === 'mastodon') {
      window.open(path + '/share?text=' + title + ' ' + link);
    } else if (service === 'hubzilla') {
      window.open(path + '/rpost?f=&url=' + link + '&title=' + title);
    } else {
      return;
    }
  };

  buttons.forEach(function (btn) {
    return btn.addEventListener('click', shareLink, false);
  });

  // shareLink on Enter press
  inputs.forEach(function (input) {
    return input.addEventListener('keypress', function (e) {
      if (e.keyCode === 13) {
        shareLink(e);
      }
    });
  });
});