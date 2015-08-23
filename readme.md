# Smark
## A string to HTML parser

Smark is a small function library built to parse Javascript strings into HTML markup. Thus, Smark is aimed at people looking to decouple strings from HTML markup so you don't need to have messy HTML markup in strings storing data for the page.

Instead of this:

```
var myString = 'Click the following <a href="http://www.somewhere.com">link</a> to somewhere.'
```

You can just do it like this:

```
var myString = 'Click the following [link] (http://www.somewhere.com) to somewhere.'
```

Smark will parse string with just Youtube or Vimeo links into the embeded code for the respective service.

```
var youtubeLink = 'https://www.youtube.com/watch?v=tITwM5GDIAI'
var youtubeHTML = smark(youtubeLink);
```

Most types of links from youtube and vimeo will work.

## Behaviours

Strings with image links only will be parsed into \<img> tags;
Strings with links that are not Youtube or Vimeo links will be parsed into an iframe.

The rest will be treated as paragraphs and put between <p> tags. If the string is identified as paragraphs, quote marks that should be “” instead of "" or ‘’ instead of '' will be replaced.

## Usage

Smark can be included in HTML or using Browserify.


## Problems

This is mostly a note-to-self section. If you have problems using Smark, it might be listed down below, other than that might not be so useful. Following is just some expected problems:

1. Need to add class to facilitate styling. According to type.
1. Return an object that contains original string, parsed string and type of match: example.source, example.smark, example.type
1. Escape parsing of "" or '' (not advised but I guess should be an option)
