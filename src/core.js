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