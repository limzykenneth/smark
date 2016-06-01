# Smark
## A string to HTML parser

[![Build Status](https://travis-ci.org/limzykenneth/smark.svg?branch=master)](https://travis-ci.org/limzykenneth/smark)

Smark is a tiny function library built to parse Javascript strings into HTML markup. Thus, Smark is aimed at people looking to decouple strings from HTML markup so you don't need to have messy HTML markup in strings or even databases storing data for the page. Smark also do typographic changes so the punctuation is used correctly in paragraphs.

Instead of this:

```
var myString = 'Click the following <a href="http://www.somewhere.com">link</a> to somewhere.';
```

You can just do it like this:

```
var myString = 'Click the following [link] (http://www.somewhere.com) to somewhere.';
```

Smark will parse string with just Youtube or Vimeo links into the embeded code for the respective service.

```
var youtubeLink = 'https://www.youtube.com/watch?v=tITwM5GDIAI';
var youtubeHTML = smark.generate(youtubeLink).html;
```

Most types of links from youtube and vimeo will work.

## Behaviours

Strings with image links only will be parsed into \<img> tags;
Strings with Youtube or Vimeo links will be parsed into their respective embed code.
Strings with links that are not Youtube or Vimeo links will be parsed into an iframe.

The rest will be treated as paragraphs and put between \<p> tags. If the string is identified as paragraphs, quote marks that should be “” instead of "" or ‘’ instead of '' will be replaced along with other typographic changes.

## Usage

Include smark.js or smark.min.js in your HTML file. Browserify compatibility is planned but not done yet (pull request is very welcomed!).

To use smark, use the `generate()` function in the global smark object passing a string as argument.

```
var example = "Sample string.";
var foo = smark.generate(example);
```

The function will return an object with two properties: `type` and `html`. `type` is the type of the string passed in ie. youtube, vimeo, paragraph, etc. `html` is the parsed result of the string and can be inserted into the DOM as is.

```
// An example with jQuery
var result = smark.generate("[jQuery] (http://www.jquery.com/)");
$("body").append(result);
// result will be <a src="http://www.jquery.com/">jQuery</a>
```

At the moment you need to look at the source for for usage case since work on documentation is not done yet. The source is heavily comment though so hopefully it shouldn't be too hard to understand.


(Note: I would consider smark to be in beta although it has pass 1.0 and I don't plan on releasing any breaking changes until 2.0. The point of it in beta is just because some features I planned might still be missing and the whole library can be more mature.)

## Problems

This is mostly a note-to-self section. If you have problems using Smark, it might be listed down below, other than that might not be so useful. Some to dos:

1. CLI use
1. Documentation