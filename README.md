
# :penguin: share / connect / support buttons

`WARNING`: This is a __mirror repo__ from [GitLab](https://gitlab.com/dexverse/share-connect-support). Please, send your MRs there. Issues can still be opened here and are welcome.

*You are probably tired of seeing this everywhere*

![preview screen](uncool.png?raw=true)

*How about *this instead?*

![preview screen](cool.png?raw=true)

_*inspired by [FSFE](https://fsfe.org/contribute/contribute.en.html) buttons_

Make your visitors wonder what those icons represent.

__Help promoting federated, privacy-friendly networks__.

#### [DEMO page](https://dexverse.gitlab.io/share-connect-support)

## What are these?

These are social buttons for your personal blog, profile. They can be added to any page, including static websites.

## Usage
The collection of buttons is basically a set of SVGs and some styles.

#### 1. Install

Copy [`styles.min.css`](/public/styles.min.css) and [`share.min.js`](/public/share.min.js) into your project directory. You will also find unminified versions in [examples](/examples) folder.

> **Note:** Only sharing buttons require the script. If you intend to use connect or support buttons, add just the styles file.

#### 2. Include

Include `styles.min.css` with a `<link>` tag in the `<head>` of your page, and `share.min.js` with a `<script>` tag.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>...</title>
    <link rel="stylesheet" href="styles.min.css">
  </head>
  <body>
    <!-- buttons go here -->
    <script src="share.min.js"></script>
  </body>
</html>
```

Include icons that you plan to use as `<symbol>` in `<head>`. You'll find all available SVGs in [example page](/public/index.html) code. This way of using SVGs provides easy manipulation.

```html
<!-- ... -->
  <head>
    <link rel="stylesheet" href="styles.min.css">
    <svg xmlns="https://www.w3.org/2000/svg" style="display: none;">
      <symbol id="icon-friendica" viewBox="0 0 24 24">
        <path d="M7.525 23.347c-.847-.005-2.535-.86-2.908-3.15-.035-.216 0-15.89 0-15.89S5.2 1.086 8.01.65h11.433v6.37h-7.267v5.087h7.267v4.796h-7.267v6.445s-4.65-.002-4.65 0z"/>
      </symbol>
    </svg>
  </head>
<!-- ... -->
```

#### 3. Use

Now add buttons referencing SVGs in `<use>` tag, like so:

```html
<a href="https://yourfriendicalink.wow" class="dex-btn wo-text circle friendica" title="Connect on Friendica" target="_blank" rel="external noopener">
  <svg role="img" class="dex-icon" width="16" height="16">
    <use xlink:href="#icon-friendica"></use>
  </svg>
</a>
```
> **Note:** Don't forget to replace demo `href` URL with your link.

Sharing buttons are a bit more complex. They require a script mentioned above and an overlay input.

```html
<input name="popup" id="overlay" class="overlay" type="radio">

<div class="share">
  <label class="dex-btn rounded  wo-text mastodon" title="Share this page on Mastodon" for="mastodon-share">
    <svg role="img" class="dex-icon" width="16" height="16">
      <use xlink:href="#icon-mastodon"></use>
    </svg>
  </label>
  <input name="popup" id="mastodon-share" class="hidden" type="radio">
  <span class="popup">
    <label for="overlay"></label>
    <input name="podurl" value="" placeholder="Mastodon URL (witches.town)" type="text"><button class="share-btn" type="submit"  value="mastodon">OK</button>
  </span>
</div>
```

## Styling

Following utility classes are provided to change button styling.

1. `.rounded` - rounded corners

2. `.oval` - more rounded corners

3. `.circle` - circle icon

4. `.wo-text` - fixed width (34px by default) for buttons without text

For more examples see [demo page](/public/index.html).

## Examples
Some websites using these buttons:
*To include yours, please, add a link below and open a pull request in the main [GitLab](https://gitlab.com/dexverse/share-connect-support) repo*

- [winterspirits.win](https://winterspirits.win)
