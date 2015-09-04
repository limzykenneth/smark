var rex = {};

// Regular expressions for matching or replace

// Use $1 to return the video id  
rex.youtubeRE = /^(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch|embed\/watch|embed)?[\?\/]?(?:v=|feature=player_embedded&v=)?(\w+)$/;
rex.vimeoRE = /^(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:channels\/)?(?:\w+\/)?(\d+)$/;


// Match the whole string to return full path to image.
// This basically just verify it is just a link to an image.
rex.imageRE = /^(?! ).+\.(jpg|jpeg|gif|png|bmp)$/;


// Match the whole string to return full URL.
// This will check that given link is not images while having http type protocol or end with html.
// Links that do not start with "http://" or end with ".html" 
//     will not be recognized to prevent some errors with iframe.
rex.htmlRE = /^((?!.*(jpg|jpeg|gif|png|bmp))(https?:\/\/)[\w\-_]+(\.[\w\-_]+)+[\w\-.,@?^=%&:\/~\\+#]*)|.+\.(?!jpg|jpeg|gif|png|bmp)html?$/;


// Parses inline markdown style link into <a> tags.
// Replace with <a href="$2">$1</a> to use.
rex.linkRE = /\[(.*?)\](?: |-blank )\((.+?)\)/g;
rex.linkBlankRE = /\[(.*?)\]-blank \((.+?)\)/g;


// Parse inline mardown style list into a list.
rex.olRE = /(?:\d\.\s(.+?) \| ?)+/g;
rex.olliRE = /\d\.\s(.+?) \|/g;
rex.ulRE = /(?:\*\s(.+?) \| ?)+/g;
rex.ulliRe = /\*\s(.+?) \|/g;


// Parses H6 to H1 tags in reverse order.
rex.h6RE = /#{6} (.+?) #{6}/g;
rex.h5RE = /#{5} (.+?) #{5}/g;
rex.h4RE = /#{4} (.+?) #{4}/g;
rex.h3RE = /#{3} (.+?) #{3}/g;
rex.h2RE = /#{2} (.+?) #{2}/g;
rex.h1RE = /# (.+?) #/g;


// Parse markdown like horizontal rule.
rex.hrRE = /\s---\s/g;


// Typographic changes. Check regex.txt for usage.
rex.dQuotRE = /([[\n \.,;:])\\?"(.+?)\\?"([\n \.,;:\b\]])/g;
rex.sQuotRE = /([[\n \.,;:])\\?'(.+?)\\?'([\n \.,;:\b\]])/g;
rex.volRE = /\bvol\.\s\b/gi;
rex.pRE = /\bp\.\s\b(?=\d+)/g;
rex.cRE = /\bc\.\s\b(?=\d+)/g;
rex.flRE = /\bfl\.\s\b(?=\d+)/g;
rex.ieRE = /\bi\.e\.\s\b/g;
rex.egRE = /\be\.g\.\s\b/g;
rex.aposRE = /([A-Za-z]+)'([a-z]+)/g;
rex.endashRE = /(\d+)-(\d+)/g;
rex.elipseRE = /\.{3}/g;


module.exports = rex;