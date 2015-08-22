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
// Replace with <a target=_blank href="$2">$1</a> to use.
var linkMdRE = /\[(.+?)\] \((.+?)\)/;

// Typographic changes. Check regex.txt for usage.
var dQuotRE = /([[\n \.,;:])\\?"(.+?)\\?"([\n \.,;:\b\]])/;
var sQuotRE = /([[\n \.,;:])\\?'(.+?)\\?'([\n \.,;:\b\]])/;

// Function to generate the final parsed html result
function snippets(source){
    var tmp = source;
    
    if(youtubeRE.test(source)){
        // Source is a Youtube link
        tmp = source.replace(youtubeRE, $1);
        snip = '<iframe src="https://www.youtube.com/embed/'+ tmp + '" frameborder="0" allowfullscreen></iframe>';

    }else if(vimeoRE.test(source)){
        // Source is a Vimeo link
        tmp = source.replace(vimeoRE, $1);
        snip = '<iframe src="https://player.vimeo.com/video/' + tmp + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

    }else if(imageRE.test(source)){
        // Source is an image link
        tmp = source.match(imageRE);
        snip = '<img src="' + tmp + '">';

    }else if(htmlRE.test(source)){
        // Source is a general link valid for iframe
        // Note: This is executed after Youtube and Vimeo test
        //       because this will be a valid match for them as well.
        tmp = source.match(htmlRE);
        snip = '<iframe src="' + tmp + '" frameborder="0"></iframe>';
    }else{
        // Typographic changes will occur here before parsing into html so as not to mess up html quote marks.
        tmp = source.replace(dQuotRE, $1 + "“" + $2 + "”" + $3);
        tmp = tmp.replace(sQuotRE, $1 + "‘" + $2 + "’" + $3);

        // Markdown style link syntax will be catch and converted.
        tmp = tmp.replace(linkMdRE, '<a target=_blank href="' + $2 + '">' + $1 + '</a>');

        // Treat the source as just a paragraph of text.
        snip = "<p>" + tmp + "</p>";
    }  

    return snip;
}

// parser
// Classes option for tags
// Prepare for module.exports


// Typographic changes (use the right character)
// use regular expressions
// jpg etc. to <img>
// youtube to <iframe youtube>
// vimeo to <iframe vimeo>
// link (http://www.something.com) to <a>
