/* @license smark.js written by Kenneth Lim <limzy.kenneth@gmail.com> (http://designerken.be)
   License under the BSD 2-Clause License */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.smark = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var smark = require("./regex.js");

// Default options
smark.options = {
	"type": "auto",
	"typography": true
};

smark.generate = function(source, options) {
	// Catching error in options
	// if(typeof options.type !== 'string') console.warn("'type' option only accepts string.");
	// if(typeof options.typography !== 'boolean') console.warn("'typopgraphy' option only accepts boolean.");

    
    // Temporary variable to store source string for parsing
    var tmp = source;
    // The resulting html will be stored in this
    var result = "";


    // Make a copy of the global options
    var opt = this.options;
    // Modify the options according to user passed in value
    for (var i in options){
    	for (var j in opt){
    		if (i == j){
    			opt.j = options.i;
    		}
    	}
    }
    // The type will be stored in this
    var type = opt.type;
    // Parse typographic marks are on by default
    var typoMark = opt.typography;


    if (this.youtubeRE.test(source)) {
        // Source is a Youtube link
        tmp = source.replace(this.youtubeRE, "$1");
        result = '<iframe class="smark youtube" src="https://www.youtube.com/embed/' + tmp + '" frameborder="0" width="853" height="480" allowfullscreen></iframe>';
        if (type == 'auto') type = "youtube";
    } else if (this.vimeoRE.test(source)) {
        // Source is a Vimeo link
        tmp = source.replace(this.vimeoRE, "$1");
        result = '<iframe class="smark vimeo" src="https://player.vimeo.com/video/' + tmp + '" frameborder="0" width="853" height="480" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
        if (type == 'auto') type = "vimeo";
    } else if (this.imageRE.test(source)) {
        // Source is an image link
        tmp1 = source.replace(this.imageRE, "$1");
        tmp2 = source.replace(this.imageRE, "$2");
        tmp2 = this.typographicChanges(true, tmp2);
        result = '<img class="smark image" title="' + tmp2 + '" src="' + tmp1 + '">';
        if (this.imageLinkRE.test(source)) {
            // tmp3 = source.replace(this.imageLinkRE, "$1");
            tmp3 = this.imageLinkRE.exec(source)[0];
            tmp3 = tmp3.substring(1, tmp3.length - 1);
            result = '<a href="' + tmp3 + '" target=_blank>' + result + "</a>";
        }
       if (type == 'auto') type = "image";
    } else if (this.htmlRE.test(source)) {
        // Source is a general link valid for iframe
        // Note: This is executed after Youtube and Vimeo test
        //       because this will be a valid match for them as well.
        tmp = source.match(this.htmlRE)[0];
        result = '<iframe class="smark website" src="' + tmp + '" width="853" height="480" frameborder="0"></iframe>';
        if (type == 'auto') type = "link";
    } else {
        // Parse the string as a paragraph.
        // Typographic changes will be made if noTypo is not passed.
        // Markdown style syntax will be converted as well.
        tmp = this.parseParagraph(typoMark, tmp);
        // Treat the source as just a paragraph of text.
        result = '<p class="smark paragraph">' + tmp + '</p>';
        if (type == 'auto') type = "paragraph";
    }

    return {
        html: result,
        type: type
    };
};


// Typographic changes will occur here before parsing into html so as not to mess up html quote marks.
smark.typographicChanges = require("./typography.js");

// Parse the string as a paragraph.
// See note.txt for more info.
smark.parseParagraph = require("./paragraph.js");

module.exports = smark;
},{"./paragraph.js":2,"./regex.js":3,"./typography.js":4}],2:[function(require,module,exports){
module.exports = function(typoMark, tmp) {
    // Typographic changes will occur here before parsing into html so as not to mess up html quote marks.
    tmp = this.typographicChanges(typoMark, tmp);
    

    // Markdown style syntax will be catch and converted.
    // Markdown style links
    // template is a reused temporary variable, for sneaky convinience only.
    var template = "";

    // If the link name is empty use the link address as the name
    if (tmp.replace(this.linkRE, '$1') === "") {
        template = '<a href="$2">$2</a>';
        if (this.linkBlankRE.test(tmp)) {
            template = '<a target=_blank href="$2">$2</a>';
        }
        // If the link name is provided, use it then.
    } else {
        template = '<a href="$2">$1</a>';
        if (this.linkBlankRE.test(tmp)) {
            template = '<a target=_blank href="$2">$1</a>';
        }
    }
    tmp = tmp.replace(this.linkRE, template);


    // Mardown style list
    // Ordered list
    var matchedOl = tmp.match(this.olRE);
    if (matchedOl !== null) {
        for (var i = 0; i < matchedOl.length; i++) {
            var matchedLi = matchedOl[i].match(this.olliRE);
            template = "<ol>";
            for (var j = 0; j < matchedLi.length; j++) {
                template += "<li>" + matchedLi[j].replace(this.olliRE, "$1") + "</li>";
            }
            template += "</ol>";
            tmp = tmp.replace(matchedOl[i], template);
        }
    }


    // Unordered list
    var matchedUl = tmp.match(this.ulRE);
    if (matchedUl !== null) {
        for (var i = 0; i < matchedUl.length; i++) {
            var matchedLi = matchedUl[i].match(this.ulliRE);
            template = "<ul>";
            for (var j = 0; j < matchedLi.length; j++) {
                template += "<li>" + matchedLi[j].replace(this.ulliRE, "$1") + "</li>";
            }
            template += "</ul>";
            tmp = tmp.replace(matchedUl[i], template);
        }
    }


    // Block quotes
    if (tmp.replace(this.bqRE, "$2") === "") {
        tmp = tmp.replace(this.bqRE, "<blockquote><p>$1</p></blockquote>");
    } else {
        tmp = tmp.replace(this.bqRE, "<blockquote><p>$1</p><footer>$2</footer></blockquote>");
    }


    // Markdown style H6 to H1, in that order.
    tmp = tmp.replace(this.h6RE, "<h6>$1</h6>");
    tmp = tmp.replace(this.h5RE, "<h5>$1</h5>");
    tmp = tmp.replace(this.h4RE, "<h4>$1</h4>");
    tmp = tmp.replace(this.h3RE, "<h3>$1</h3>");
    tmp = tmp.replace(this.h2RE, "<h2>$1</h2>");
    tmp = tmp.replace(this.h1RE, "<h1>$1</h1>");


    // Markdown like horizontal rule.
    // This is much stricter than markdown and I like to keep it that way.
    //    For consistency. Convention before configuration or something like that.
    tmp = tmp.replace(this.hrRE, "<hr />");
    return tmp;
};
},{}],3:[function(require,module,exports){
var reg = {
	// Smark is mainly based on using regex.
	// Regular expressions for matching or replace

	// Use $1 to return the video id  
	youtubeRE: /^(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch|embed\/watch|embed)?[\?\/]?(?:v=|feature=player_embedded&v=)?(\w+)$/,
	vimeoRE: /^(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:channels\/)?(?:\w+\/)?(\d+)$/,


	// Match the whole string to return full path to image.
	// This basically just verify it is just a link to an image.
	imageRE: /^(?! )(.+?\.(?:jpg|jpeg|gif|png|bmp))(?: -title="(.+?)")?(?:\(.+?\))?$/,
	imageLinkRE: /(?:\((.+?)\)){1}/,


	// Match the whole string to return full URL.
	// This will check that given link is not images while having http type protocol or end with html.
	// Links that do not start with "http://" or end with ".html" 
	//     will not be recognized to prevent some errors with iframe.
	htmlRE: /^((?!.*(jpg|jpeg|gif|png|bmp))(https?:\/\/)[\w\-_]+(\.[\w\-_]+)+[\w\-.,@?^=%&:\/~\\+#]*)|.+\.(?!jpg|jpeg|gif|png|bmp)html?$/,


	// Parses inline markdown style link into <a> tags.
	// Replace with <a href="$2">$1</a> to use.
	linkRE: /\[(.*?)\](?:|-blank) ?\((.+?)\)/g,
	linkBlankRE: /\[(.*?)\]-blank ?\((.+?)\)/g,


	// Parse inline mardown style list into a list.
	olRE: /(?:\d\.\s(.+?) \| ?)+/g,
	olliRE: /\d\.\s(.+?) \|/g,
	ulRE: /(?:\*\s(.+?) \| ?)+/g,
	ulliRE: /\*\s(.+?) \|/g,


	// Parses H6 to H1 tags in reverse order.
	h6RE: /\s?#{6} (.+?) #{6}\s?/g,
	h5RE: /\s?#{5} (.+?) #{5}\s?/g,
	h4RE: /\s?#{4} (.+?) #{4}\s?/g,
	h3RE: /\s?#{3} (.+?) #{3}\s?/g,
	h2RE: /\s?#{2} (.+?) #{2}\s?/g,
	h1RE: /\s?# (.+?) #\s?/g,


	// Parse markdown like horizontal rule.
	hrRE: /\s?---\s?/g,


	// Parse markdown like block quotes.
	bqRE: /```(.+?)(?:\[-source:\s?(.+)\])?```/g,


	// Typographic changes. Check regex.txt for usage.
	dQuotRE: /(^|\s(?:[ \.,;:\b\[])?)\\?"(.+?)\\?"([ \.,;:\b\]])?/g,
	sQuotRE: /(^|\s(?:[ \.,;:\b\[])?)\\?'(.+?)\\?'([ \.,;:\b\]])?/g,
	volRE: /\bvol\.\s\b/gi,
	pRE: /\bp\.\s\b(?=\d+)/g,
	cRE: /\bc\.\s\b(?=\d+)/g,
	flRE: /\bfl\.\s\b(?=\d+)/g,
	ieRE: /\bi\.e\.\s?\b/g,
	egRE: /\be\.g\.\s\b/g,
	aposRE: /([A-Za-z]+)'([a-z]+)/g,
	endashRE: /(.+)\s-\s(.+)/g,
	elipseRE: /\.{3}/g
};

module.exports = reg;
},{}],4:[function(require,module,exports){
module.exports = function(enabled, tmp) {
    tmp = tmp.replace(this.dQuotRE, "$1&#8220;$2&#8221;$3");
    tmp = tmp.replace(this.sQuotRE, "$1&#8216;$2&#8217;$3");
    tmp = tmp.replace(this.volRE, "Vol.");
    tmp = tmp.replace(this.pRE, "p.");
    tmp = tmp.replace(this.cRE, "<i>c.</i>");
    tmp = tmp.replace(this.flRE, "<i>fl.</i>");
    tmp = tmp.replace(this.ieRE, "<i>ie</i> ");
    tmp = tmp.replace(this.egRE, "<i>eg</i> ");
    tmp = tmp.replace(this.aposRE, "$1&#8217;$2");
    tmp = tmp.replace(this.endashRE, "$1&#8211;$2");
    tmp = tmp.replace(this.elipseRE, "&#8230;");
    return tmp;
};
},{}]},{},[1])(1)
});