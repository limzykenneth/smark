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