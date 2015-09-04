module.exports = function(){
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
        // Typographic changes will occur here before parsing into html so as not to mess up html quote marks.
        if (typoMark){
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
        }


        // Markdown style syntax will be catch and converted.
        // Markdown style links
        var template = "";
        // If the link name is empty use the link address as the name
        if (tmp.replace(linkRE, '$1') === ""){
            template = '<a href="$2">$2</a>';
            if (linkBlankRE.test(tmp)){
                template = '<a target=_blank href="$2">$2</a>';
            }

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


        // Treat the source as just a paragraph of text.
        result = "<p>" + tmp + "</p>";
        this.type = "paragraph";
    }  

    return result;
};