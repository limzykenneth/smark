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