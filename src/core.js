var smark = require("./regex.js");

// Type detection
smark.typeIs = require("./typeIs.js");

// Typographic changes will occur here before parsing into html so as not to mess up html quote marks.
smark.typographicChanges = require("./typography.js");

// Parse the string as a paragraph.
// See note.txt for more info.
smark.parseParagraph = require("./paragraph.js");

smark.generate = function(source, options) { 
    // The resulting html will be stored in this
    var result = "";

    // Default options
    var opt = {
        "type": "auto",
        "typography": true
    };
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

    if (type == "auto"){
        if (this.typeIs(source) == "youtube") {
            // Source is a Youtube link
            type = "youtube";
        } else if (this.typeIs(source) == "vimeo") {
            // Source is a Vimeo link
            type = "vimeo";
        } else if (this.typeIs(source) == "image") {
            // Source is an image link
            type = "image";
        } else if (this.typeIs(source) == "link") {
            // Source is a general link valid for iframe
            type = "link";
        } else if (this.typeIs(source) == "paragraph") {
            // Parse the string as a paragraph.
            type = "paragraph";
        }
    }else{
        type = opt.type;
    }

    result = parse(source, type);

    return {
        html: result,
        type: type
    };

    // parse() don't care about whether the type for str make sense or not,
    // it just parse.
    function parse(str, type){
        var ret;
        var that = smark;
        switch(type){
            case "youtube":
                str = str.replace(that.youtubeRE, "$1");
                ret = '<iframe class="smark youtube" src="https://www.youtube.com/embed/' + str + '" frameborder="0" width="853" height="480" allowfullscreen></iframe>';
                break;

            case "vimeo":
                str = str.replace(that.vimeoRE, "$1");
                ret = '<iframe class="smark vimeo" src="https://player.vimeo.com/video/' + str + '" frameborder="0" width="853" height="480" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
                break;

            case "image":
                var tmp1 = str.replace(that.imageRE, "$1");
                var tmp2 = str.replace(that.imageRE, "$2");
                tmp2 = that.typographicChanges(true, tmp2);
                ret = '<img class="smark image" title="' + tmp2 + '" src="' + tmp1 + '">';
                if (that.imageLinkRE.test(str)) {
                    var tmp3 = that.imageLinkRE.exec(str)[0];
                    tmp3 = tmp3.substring(1, tmp3.length - 1);
                    ret = '<a href="' + tmp3 + '" target=_blank>' + ret + "</a>";
                }
                break;

            case "link":
                // Note: This is executed after Youtube and Vimeo test
                //       because this will be a valid match for them as well.
                str = str.match(that.htmlRE)[0];
                ret = '<iframe class="smark website" src="' + str + '" width="853" height="480" frameborder="0"></iframe>';
                break;

            case "paragraph":
                // Typographic changes will be made if noTypo is not passed.
                // Markdown style syntax will be converted as well.
                str = that.parseParagraph(typoMark, str);
                // Treat the source as just a paragraph of text.
                ret = '<p class="smark paragraph">' + str + '</p>';
                break;

            default:
                ret = "";
        }
        return ret;
    }
};

module.exports = smark;