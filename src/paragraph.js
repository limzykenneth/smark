var reg = require("./regex.js");
module.exports = function(typoMark, tmp) {
    // Typographic changes will occur here before parsing into html so as not to mess up html quote marks.
    tmp = this.typographicChanges(typoMark, tmp);
    

    // Markdown style syntax will be catch and converted.
    // Markdown style links
    // template is a reused temporary variable, for sneaky convinience only.
    var template = "";

    // Format link, markdown style with blank option
    tmp = linksParsing(tmp);


    // Mardown style list
    // Ordered list
    var matchedOl = tmp.match(reg.olRE);
    if (matchedOl !== null) {
        for (var i = 0; i < matchedOl.length; i++) {
            var matchedLi = matchedOl[i].match(reg.olliRE);
            template = "<ol>";
            for (var j = 0; j < matchedLi.length; j++) {
                template += "<li>" + matchedLi[j].replace(reg.olliRE, "$1") + "</li>";
            }
            template += "</ol>";
            tmp = tmp.replace(matchedOl[i], template);
        }
    }


    // Unordered list
    var matchedUl = tmp.match(reg.ulRE);
    if (matchedUl !== null) {
        for (var i = 0; i < matchedUl.length; i++) {
            var matchedLi = matchedUl[i].match(reg.ulliRE);
            template = "<ul>";
            for (var j = 0; j < matchedLi.length; j++) {
                template += "<li>" + matchedLi[j].replace(reg.ulliRE, "$1") + "</li>";
            }
            template += "</ul>";
            tmp = tmp.replace(matchedUl[i], template);
        }
    }


    // Block quotes
    if (reg.bqRE.test(tmp)){
	    if (tmp.replace(reg.bqRE, "$2") === "") {
	        tmp = tmp.replace(reg.bqRE, "<blockquote><p>$1</p></blockquote>");
	    } else {
	    	// var tmp2 = tmp.replace(reg.bqRE, "$2");
	    	// tmp2 = linksParsing(tmp2);
	        tmp = tmp.replace(reg.bqRE, "<blockquote><p>$1</p><footer>$2</footer></blockquote>");
	    }
	}


    // Markdown style H6 to H1, in that order.
    tmp = tmp.replace(reg.h6RE, "<h6>$1</h6>");
    tmp = tmp.replace(reg.h5RE, "<h5>$1</h5>");
    tmp = tmp.replace(reg.h4RE, "<h4>$1</h4>");
    tmp = tmp.replace(reg.h3RE, "<h3>$1</h3>");
    tmp = tmp.replace(reg.h2RE, "<h2>$1</h2>");
    tmp = tmp.replace(reg.h1RE, "<h1>$1</h1>");


    // Markdown like horizontal rule.
    // This is much stricter than markdown and I like to keep it that way.
    //    For consistency. Convention before configuration or something like that.
    tmp = tmp.replace(reg.hrRE, "<hr />");
    return tmp;

    function linksParsing(src){
    	// Both address and name are provided
	    if (src.replace(reg.linkRE, "$1") !== "") {
	        template = '<a href="$2">$1</a>';
	        if (reg.linkBlankRE.test(src)) {
	            template = '<a target=_blank href="$2">$1</a>';
	        }
	    }
	    src = src.replace(reg.linkRE, template);

	    // If the link name is empty use the link address as the name
	    if (src.replace(reg.linkBareRE, "$1") !== ""){
	    	template = '<a href="$1">$1</a>';
	    	if (reg.linkBlankRE.test(src)) {
	            template = '<a target=_blank href="$1">$1</a>';
	        }
	    }
	    src = src.replace(reg.linkBareRE, template);
    	return src;
    }
};