# Parallax Header

With the _Parallax Header_ you can integrate a header with an individual parallax effect into your project.

The _Parallax Header_ is developed with JavaScript Web Components.

## Preview

[You can view the demo here](https://parallax-header.frissbee.de/).

## Description

Implement the _Parallax Header_ in your project:

**1. Step - download and add**

Download or clone the repo and add the file `parallax-header_0.1.0.js` into your project.

**2. Step - implementation**

Include the `parallax-header_0.1.0.js` file in the corresponding HTML or PHP file with `<script src="./path-to-the-file/parallax-header_0.1.0.js" defer></script>` in the `<head>`-Tag

**3. Step - insert the parallax-header HTML tag**

Insert the `<parallax-header></parallax-header>` tag.

Within the `<parallax-header></parallax-header>` tag, first add the background image with `slot="image"` and then the foreground as `div` with `slot="content"`, which then contains the desired HTML content.

**4. Step - customize**

Use the attributes (see below) to customize the _Parallax Header_.

JavaScript is not necessary

**See examples in:** `index.html`, `content-down.html` and `multi-content.html`

## Quick view

There are two variations:

- **Variation 1**: Background image and **one** foreground with text and HTML
- **Variation 2**: Background image and **several** foregrounds with text and HTML

The position and scroll speed of the background image and the foregrounds can be individually adjusted to achieve the desired parallax effect.

Example for version 1:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- 1. Implement the "parallax-header_0.1.0.js" file -->
    <script src="./assets/js/parallax-header_0.1.0.js" defer></script>
  </head>
  <body>
    <!-- 2. Implement -->
    <parallax-header y-image="0.5" y-content="0.6" x-content="0" height-container="924px" space-top="0px">
      <!-- 3. Image - with slot="image" -->
      <img src="./path-to-image/file-name.jpg" alt="" slot="image" />

      <!-- 4. Content - with slot="content" -->
      <div class="container" slot="content">
        <h1>Parallax Header</h1>
        <!-- more HTML... -->
      </div>
    </parallax-header>

    <main>
      <!-- ======================
      Here the following content
      The content must have a background color.
      ====================== -->
    </main>
  </body>
</html>
```

Example for version 2:

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- 1. Implement the "parallax-header_0.1.0.js" file -->
    <script src="./assets/js/parallax-header_0.1.0.js" defer></script>
  </head>
  <body>
    <header>
      <div class="container-fluid py-3">
        <a href="https://frissbee.de" target="_blank" rel="noopener noreferrer" style="color: #f1f1f1; direction: unset">frissbee.de</a>
      </div>
    </header>
    <!-- 2. Implement the "parallax-header" HTML tag -->
    <parallax-header y-image="0.7" height-container="924px" multi-content>
      <!-- 3. Implement the background image - with slot="image" -->
      <img src="./images/home-top-0d.jpg" alt="home top" slot="image" />

      <!-- 4. Implement the content - with slot="content" -->
      <div slot="content">
        <!-- 4.1. Content -->
        <div
          style="top: 260px; position: absolute; width: 100%; height: 804px; background-image: url('./images/home-top-9b.png'); z-index: -1;"
          class="parallax-header-content"
          y-content="0.7"
          x-content="0"
        ></div>

        <!-- more (background) images or HTML... -->

        <!-- 4.2. Content  -->
        <div class="parallax-header-content" style="top: 0; position: relative" y-content="1.4" x-content="0">
          <div class="container">
            <h1>Multi Parallax</h1>
            <!-- more HTML... -->
          </div>
        </div>
      </div>

      <!-- more HTML... -->
    </parallax-header>

    <main>
      <!-- ======================
      Here the following content
      The content must have a background color.
      ====================== -->
    </main>
  </body>
</html>
```

The following must be specified for CSS in the content:

- `position` => "absolute" for images, "relative" for clickable HTML elements such as `button` or `select`.
- `top`
- `height`
- `width`
- `background-image: url('./path-to-file/image-name.jpg');`
- `z-index: -1;` => For images, not for clickable HTML elements such as `button` or `select`.

Class

- `class="parallax-header-content"`

Attributes

- `y-content`
- `x-content`

**See example: `multi-content.html`**

## Attributes

- `y-image`

  Specifies the factor for how the background image on the Y-Axe should move when scrolling.

  Negative values are possible.

  Example: `y-image="0.5"` (default)

- `y-content`

  Specifies the factor for how the content on the Y-axis should move when scrolling.

  Negative values are possible.

  Example: `y-content="0.6"` (default)

- `x-content`

  Specifies the factor for how the content on the X-axis should move when scrolling.

  Negative values are possible.

  Example: `x-content="0"` (default)

- `height-container`

  Height of the container

  Example: `height-container="924px"` (default)

- `space-top`

  Spacing from the top.

  Example: `space-top="0px"` (default)

- `multi-content`

  This attribute is used if several contents are to be placed above the background image.

  If this attribute is specified, the attributes `and` must be set in the content containers and not in the `` tag.

  **See example: `multi-content.html`**
