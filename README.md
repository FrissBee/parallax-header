# Parallax Header

With the _Parallax Header_ you can integrate a header with an individual parallax effect into your project.

The position and scroll speed of the background image and the foregrounds can be individually adjusted to achieve the desired parallax effect.

The _Parallax Header_ is developed with JavaScript Web Components.

## Preview

[You can view the demo here](https://parallax-header.frissbee.de/).

## Description

Implement the _Parallax Header_ in your project:

**1. Step - download and add**

Download or clone the repo and add the file `parallax-header_1.0.0.js` into your project.

**2. Step - implementation**

Include the `parallax-header_1.0.0.js` file in the corresponding HTML or PHP file with `<script src="./path-to-the-file/parallax-header_1.0.0.js" defer></script>` in the `<head>`-Tag

**3. Step - implement the parallax-header HTML tag**

Implement the `<parallax-header></parallax-header>` tag with the `<parallax-header-image"></parallax-header-image>` tag for images and the `<parallax-header-content></parallax-header-content>` tag for content.

Set the `y-content` attribute and, if required, the `x-content` attribute with the corresponding value for the speed and direction of the movement.

JavaScript is not necessary

**See examples in:** `index.html`, `content-down.html` and `multi-content.html`

## Quick view

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- 1. Implement the "parallax-header_1.0.0.js" file -->
    <script src="./assets/js/parallax-header_1.0.0.js" defer></script>
  </head>

  <body>
    <!-- 2. Implement -->
    <parallax-header height-container="724px" space-top="0px">
      <!-- 3. Background Image & Content -->

      <!-- 3.1. Background Image -->
      <parallax-header-image y-content="0.7">
        <img src="./path-to-the file/file-name.jpg" alt="" />
      </parallax-header-image>

      <!-- 3.2. Content -->
      <parallax-header-content y-content="0.6">
        <div class="container">
          <h1>Parallax Header</h1>
          <!-- more text/HTML... -->
        </div>
      </parallax-header-content>
    </parallax-header>

    <main>
      <!-- ======================
        Here the following content
      ====================== -->
    </main>
  </body>
</html>
```

Multiple images and content (text/HTML) are possible. **See example** `multi-content.html`.

## Attributes

- `y-content`

  Specifies the factor for how the image/content on the Y-axis should move when scrolling.

  Negative values are possible.

  Example: `y-content="0.6"`

- `x-content`

  Specifies the factor for how the image/content on the X-axis should move when scrolling.

  Negative values are possible.

  Example: `x-content="0"`

- `height-container`

  Height of the container of the _Parallax Header_.

  Example: `height-container="924px"`

- `space-top`

  Spacing from the top.

  Example: `space-top="0px"`

- `over-flow`

  If this attribute is set for the `<parallax-header-image"></parallax-header-image>` tag, the corresponding image is displayed beyond the container. This can be used to achieve a corresponding effect. **See example:** `content-down.html`

  A value is not necessary.
