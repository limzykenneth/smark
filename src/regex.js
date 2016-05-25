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
	linkRE: /\[(?!-)(.*?)\](?:|-blank) ?\((.+?)\)/g,
	linkBlankRE: /\[(?!-)(.*?)\]-blank ?\((.+?)\)/g,
	linkBareRE: /\[(?!-)(.*?)\](?:-blank)?/g,
	linkBareBlankRE: /\[(?!-)(.*?)\](?:-blank)/g,


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