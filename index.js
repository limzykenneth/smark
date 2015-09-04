var smark = smark || {};

// Regular expressions for matching or replace

// Use $1 to return the video id  
var youtubeRE = /^(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch|embed\/watch|embed)?[\?\/]?(?:v=|feature=player_embedded&v=)?(\w+)$/;
var vimeoRE = /^(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:channels\/)?(?:\w+\/)?(\d+)$/;


// Match the whole string to return full path to image.
// This basically just verify it is just a link to an image.
var imageRE = /^(?! ).+\.(jpg|jpeg|gif|png|bmp)$/;


// Match the whole string to return full URL.
// This will check that given link is not images while having http type protocol or end with html.
// Links that do not start with "http://" or end with ".html" 
//     will not be recognized to prevent some errors with iframe.
var htmlRE = /^((?!.*(jpg|jpeg|gif|png|bmp))(https?:\/\/)[\w\-_]+(\.[\w\-_]+)+[\w\-.,@?^=%&:\/~\\+#]*)|.+\.(?!jpg|jpeg|gif|png|bmp)html?$/;


// Parses inline markdown style link into <a> tags.
// Replace with <a href="$2">$1</a> to use.
var linkRE = /\[(.*?)\](?: |-blank )\((.+?)\)/g;
var linkBlankRE = /\[(.*?)\]-blank \((.+?)\)/g;


// Parse inline mardown style list into a list.
var olRE = /(?:\d\.\s(.+?) \| ?)+/g;
var olliRE = /\d\.\s(.+?) \|/g;
var ulRE = /(?:\*\s(.+?) \| ?)+/g;
var ulliRe = /\*\s(.+?) \|/g;


// Parses H6 to H1 tags in reverse order.
var h6RE = /#{6} (.+?) #{6}/g;
var h5RE = /#{5} (.+?) #{5}/g;
var h4RE = /#{4} (.+?) #{4}/g;
var h3RE = /#{3} (.+?) #{3}/g;
var h2RE = /#{2} (.+?) #{2}/g;
var h1RE = /# (.+?) #/g;


// Parse markdown like horizontal rule.
var hrRE = /\s---\s/g;


// Typographic changes. Check regex.txt for usage.
var dQuotRE = /([[\n \.,;:])\\?"(.+?)\\?"([\n \.,;:\b\]])/g;
var sQuotRE = /([[\n \.,;:])\\?'(.+?)\\?'([\n \.,;:\b\]])/g;
var volRE = /\bvol\.\s\b/gi;
var pRE = /\bp\.\s\b(?=\d+)/g;
var cRE = /\bc\.\s\b(?=\d+)/g;
var flRE = /\bfl\.\s\b(?=\d+)/g;
var ieRE = /\bi\.e\.\s\b/g;
var egRE = /\be\.g\.\s\b/g;
var aposRE = /([A-Za-z]+)'([a-z]+)/g;
var endashRE = /(\d+)-(\d+)/g;
var elipseRE = /\.{3}/g;

// Prepare for code base restructure
// smark.rex = require("./regex");
// smark.toHTML = require("./core");

smark.toHTML = function(source, options){
    var tmp = source;
    var typoMark = true;
    var result = "";

    for (var i = 0; i<options.length; i++){
        if (options[i]==noTypo) typoMark = false;
    }

    if(youtubeRE.test(source)){
        // Source is a Youtube link
        tmp = source.replace(youtubeRE, "$1");
        result = '<iframe src="https://www.youtube.com/embed/'+ tmp + '" frameborder="0" allowfullscreen></iframe>';
        this.type = "youtube";

    }else if(vimeoRE.test(source)){
        // Source is a Vimeo link
        tmp = source.replace(vimeoRE, "$1");
        result = '<iframe src="https://player.vimeo.com/video/' + tmp + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
        this.type = "vimeo";

    }else if(imageRE.test(source)){
        // Source is an image link
        tmp = source.match(imageRE)[0];
        result = '<img src="' + tmp + '">';
        this.type = "image";

    }else if(htmlRE.test(source)){
        // Source is a general link valid for iframe
        // Note: This is executed after Youtube and Vimeo test
        //       because this will be a valid match for them as well.
        tmp = source.match(htmlRE)[0];
        result = '<iframe src="' + tmp + '" frameborder="0"></iframe>';
        this.type = "website";

    }else{
        // Parse the string as a paragraph.
        // Typographic changes will be made if noTypo is not passed.
        // Markdown style syntax will be converted as well.
        tmp = smark.parseParagraph(typoMark, tmp);

        // Treat the source as just a paragraph of text.
        result = "<p>" + tmp + "</p>";
        this.type = "paragraph";
    }  

    return result;
};



// Typographic changes will occur here before parsing into html so as not to mess up html quote marks.
smark.typographicChanges = function(enabled, tmp){
    tmp = source.replace(dQuotRE, "$1“$2”$3");
    tmp = tmp.replace(sQuotRE, "$1‘$2’$3");
    tmp = tmp.replace(volRE, "Vol.");
    tmp = tmp.replace(pRE, "p.");
    tmp = tmp.replace(cRE, "<i>c.</i>");
    tmp = tmp.replace(flRE, "<i>fl.</fl>");
    tmp = tmp.replace(ieRE, "<i>ie</i> ");
    tmp = tmp.replace(egRE, "<i>eg</i> ");
    tmp = tmp.replace(aposRE, "$1’$2");
    tmp = tmp.replace(endashRE, "$1–$2");
    tmp = tmp.replace(elipseRE, "…");

    return tmp;
};


// Parse the string as a paragraph.
// See note.txt for more info.
smark.parseParagraph = function(typoMark, tmp){
    // Typographic changes will occur here before parsing into html so as not to mess up html quote marks.
    tmp = smark.typographicChanges(typoMark, tmp);

    // Markdown style syntax will be catch and converted.
    // Markdown style links

    // template is a reused temporary variable, for sneaky convinience only.
    var template = "";
    

    // If the link name is empty use the link address as the name
    if (tmp.replace(linkRE, '$1') === ""){
        template = '<a href="$2">$2</a>';
        if (linkBlankRE.test(tmp)){
            template = '<a target=_blank href="$2">$2</a>';
        }
    // If the link name is provided, use it then.
    }else{
        template = '<a href="$2">$1</a>';
        if (linkBlankRE.test(tmp)){
            template = '<a target=_blank href="$2">$1</a>';
        }
    }
    tmp = tmp.replace(linkRE, template);


    // Mardown style list
    // Ordered list
    var matchedOl = tmp.match(olRE);
    for (var i=0; i<matchedOl.length; i++){
        var matchedLi = matchedOl[i].match(olliRE);

        template = "<ol>";
        for (var j=0; j<matchedLi; j++){
            template += "<li>" + matchedLi[j].replace(olliRe, "$1") + "</li>";
        }
        template += "</ol>";
        tmp.replace(matchedOl[i], template);
    }

    // Unordered list
    var matchedUl = tmp.match(ulRE);
    for (var i=0; i<matchedUl.length; i++){
        var matchedLi = matchedUl[i].match(ulliRE);

        template = "<ul>";
        for (var j=0; j<matchedLi; j++){
            template += "<li>" + matchedLi[j].replace(ulliRe, "$1") + "</li>";
        }
        template += "</ul>";
        tmp.replace(matchedUl[i], template);
    }


    // Markdown style H6 to H1, in that order.
    tmp.replace(h6RE, "<h6>$1</h6>");
    tmp.replace(h5RE, "<h5>$1</h5>");
    tmp.replace(h4RE, "<h4>$1</h4>");
    tmp.replace(h3RE, "<h3>$1</h3>");
    tmp.replace(h2RE, "<h2>$1</h2>");
    tmp.replace(h1RE, "<h1>$1</h1>");


    // Markdown like horizontal rule.
    // This is much stricter than markdown and I like to keep it that way.
    //    For consistency. Convention before configuration or something like that.
    tmp.replace(hrRE, "<hr />");

    return tmp;
};

module.exports = smark;
