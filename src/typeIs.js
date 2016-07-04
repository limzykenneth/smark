var reg = require("./regex.js");

typeIs = function(str){
	if (this.youtubeRE.test(str)) {
        // Source is a Youtube link
        return "youtube";
    } else if (this.vimeoRE.test(str)) {
        // Source is a Vimeo link
        return "vimeo";
    } else if (this.imageRE.test(str)) {
        // Source is an image link
        return "image";
    } else if (this.htmlRE.test(str)) {
        // Source is a general link valid for iframe
        return "link";
    } else {
        // Source is a paragraph.
        return "paragraph";
    }
};

module.exports = typeIs;