var assert = require("chai").assert;
var smark = require("../smark.js");

// Quick sanity test
var sanity = {
	source: "The quick brown fox jumps over the lazy dog. THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.",
	expected: '<p class="smark paragraph">The quick brown fox jumps over the lazy dog. THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.</p>',
	type: "paragraph"
};

describe("For the sake of sanity,", function(){
	it('should return the same thing except for being wrapped in <p> tags', function(){
		assert.equal(smark.generate(sanity.source).html, sanity.expected);
	});

	it('should be of type "paragraph"', function(){
		assert.equal(smark.generate(sanity.source).type, sanity.type);
	});
});

var paragraphTestCases = {
	"links": [
		{
			original: 'The idea is borrowed from ["Telescope time without tears"](http://arxiv.org/pdf/0906.1943.pdf).',
			expected: 'The idea is borrowed from <a href="http://arxiv.org/pdf/0906.1943.pdf">&#8220;Telescope time without tears&#8221;</a>.'
		},

		{
			original: 'The idea is borrowed from ["Telescope time without tears"] (http://arxiv.org/pdf/0906.1943.pdf).',
			expected: 'The idea is borrowed from <a href="http://arxiv.org/pdf/0906.1943.pdf">&#8220;Telescope time without tears&#8221;</a>.'
		},

		{
			original: 'You can find more information explained by Professor Merrifield himself on [Youtube]-blank (https://www.youtube.com/watch?v=7c0CoXFApnM).',
			expected: 'You can find more information explained by Professor Merrifield himself on <a target=_blank href="https://www.youtube.com/watch?v=7c0CoXFApnM">Youtube</a>.'
		},

		{
			original: 'Learn more at [http://www.esa.int/ESA].',
			expected: 'Learn more at <a href="http://www.esa.int/ESA">http://www.esa.int/ESA</a>.'
		}
	],
	"blockquotes": [
		{
			original: "```This is a blockquote.```",
			expected: '<blockquote><p>This is a blockquote.</p></blockquote>'
		},

		{
			original: "```This is a credited blockquote.[-source:Telescope Time Without Tears]```",
			expected: '<blockquote><p>This is a credited blockquote.</p><footer>Telescope Time Without Tears</footer></blockquote>'
		},

		{
			original: "```This is a credited blockquote.[-source: Telescope Time Without Tears]```",
			expected: '<blockquote><p>This is a credited blockquote.</p><footer>Telescope Time Without Tears</footer></blockquote>'
		},

		{
			original: "```This is a linked credited blockquote.[-source:[Telescope Time Without Tears](https://www.youtube.com/watch?v=7c0CoXFApnM)]```",
			expected: '<blockquote><p>This is a linked credited blockquote.</p><footer><a href="https://www.youtube.com/watch?v=7c0CoXFApnM">Telescope Time Without Tears</a></footer></blockquote>'
		}
	],
	"lists": [
		{
			original: "# Shopping list # 1. Apples | 1. Potatoes | 1. Tomatoes | 1. Milk | 1. Eggs |",
			expected: '<h1>Shopping list</h1><ol><li>Apples</li><li>Potatoes</li><li>Tomatoes</li><li>Milk</li><li>Eggs</li></ol>'
		},

		{
			original: "## Where to shop ## * Round the corner | * Sainsbury's | * \"The grocery store\" |",
			expected: '<h2>Where to shop</h2><ul><li>Round the corner</li><li>Sainsbury&#8217;s</li><li>&#8220;The grocery store&#8221;</li></ul>'
		}
	],
	"headings": [
		{
			original: "# heading 1 #",
			expected: '<h1>heading 1</h1>'
		},

		{
			original: "## heading 2 ##",
			expected: '<h2>heading 2</h2>'
		},

		{
			original: "### heading 3 ###",
			expected: '<h3>heading 3</h3>'
		},

		{
			original: "#### heading 4 ####",
			expected: '<h4>heading 4</h4>'
		},

		{
			original: "##### heading 5 #####",
			expected: '<h5>heading 5</h5>'
		},

		{
			original: "###### heading 6 ######",
			expected: '<h6>heading 6</h6>'
		}
	],
	"horizontalRules": [
		{
			original: "--- Tables of logarithms --- With the advent of the metric system after the French Revolution it was decided that the quarter circle should be divided into 100 degrees instead of 90 degrees.",
			expected: "<hr />Tables of logarithms<hr />With the advent of the metric system after the French Revolution it was decided that the quarter circle should be divided into 100 degrees instead of 90 degrees."
		}
	],

	// Typographic marks
	"ndash": [
		{
			original: "May 4, 1733 - February 19, 1799",
			expected: "May 4, 1733&#8211;February 19, 1799"
		},

		{
			original: "Jean-Charles, chevalier de Borda",
			expected: "Jean-Charles, chevalier de Borda"
		},

		{
			original: "Melancholy graphic design student expired in 2016 who makes love and art to postpone her suicide. Taipei - Kaohsiung - London, \"the eternal flight of myself from myself\".",
			expected: "Melancholy graphic design student expired in 2016 who makes love and art to postpone her suicide. Taipei&#8211;Kaohsiung&#8211;London, &#8220;the eternal flight of myself from myself&#8221;."
		}
	],
	"quotemarks": [
		{
			original: '"The grocery store"',
			expected: "&#8220;The grocery store&#8221;"
		},

		{
			original: "'The grocery store'",
			expected: "&#8216;The grocery store&#8217;"
		}
	],
	"apostrophes": [
		{
			original: "It's a nice day.",
			expected: "It&#8217;s a nice day."
		},

		{
			original: "Don't litter, you'll regret it.",
			expected: "Don&#8217;t litter, you&#8217;ll regret it."
		}
	],
	"ellipses": [
		{
			original: "Hmm...",
			expected: "Hmm&#8230;"
		},

		{
			original: "Erm...maybe...?",
			expected: "Erm&#8230;maybe&#8230;?"
		}
	],
	"concatenations": [
		{
			original: "Awesome mix vol. 1",
			expected: "Awesome mix Vol.1"
		},

		{
			original: "Please see p. 32",
			expected: "Please see p.32"
		},

		{
			original: "Stephen of Blois (c. 1092/6 - 25 October 1154)",
			expected: "Stephen of Blois (<i>c.</i>1092/6&#8211;25 October 1154)"
		},

		{
			original: "Floruit, abbreviated fl. 1999, in Latin meaning 'he/she flourished'.",
			expected: "Floruit, abbreviated <i>fl.</i>1999, in Latin meaning &#8216;he/she flourished&#8217;."
		},

		{
			original: "Henry Tudor, i.e. King Henry VII.",
			expected: "Henry Tudor, <i>ie</i> King Henry VII."
		},

		{
			original: "Time of the day, e.g. morning, afternoon and night.",
			expected: "Time of the day, <i>eg</i> morning, afternoon and night."
		}
	]
};

var embededTestCases = {
	"youtube": [
		{
			original: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
			expected: '<iframe class="smark youtube" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" width="853" height="480" allowfullscreen></iframe>'
		},
		{
			original: "https://youtu.be/dQw4w9WgXcQ",
			expected: '<iframe class="smark youtube" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" width="853" height="480" allowfullscreen></iframe>'
		},
		{
			original: "http://www.youtube.com/watch?v=dQw4w9WgXcQ",
			expected: '<iframe class="smark youtube" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" width="853" height="480" allowfullscreen></iframe>'
		},
		{
			original: "http://youtu.be/dQw4w9WgXcQ",
			expected: '<iframe class="smark youtube" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" width="853" height="480" allowfullscreen></iframe>'
		},
		{
			original: "https://www.youtube.com/embed/dQw4w9WgXcQ",
			expected: '<iframe class="smark youtube" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" width="853" height="480" allowfullscreen></iframe>'
		},
		{
			original: "www.youtube.com/watch?v=dQw4w9WgXcQ",
			expected: '<iframe class="smark youtube" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" width="853" height="480" allowfullscreen></iframe>'
		},
		{
			original: "youtube.com/watch?v=dQw4w9WgXcQ",
			expected: '<iframe class="smark youtube" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" width="853" height="480" allowfullscreen></iframe>'
		},
		{
			original: "youtu.be/dQw4w9WgXcQ",
			expected: '<iframe class="smark youtube" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" width="853" height="480" allowfullscreen></iframe>'
		},
		{
			original: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtu.be",
			expected: '<iframe class="smark youtube" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" width="853" height="480" allowfullscreen></iframe>'
		}
	],
	"vimeo": [
		{
			original: "https://vimeo.com/87007946",
			expected: '<iframe class="smark vimeo" src="https://player.vimeo.com/video/87007946?title=1&byline=1&portrait=1" frameborder="0" width="853" height="480" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
		},
		{
			original: "http://vimeo.com/87007946",
			expected: '<iframe class="smark vimeo" src="https://player.vimeo.com/video/87007946?title=1&byline=1&portrait=1" frameborder="0" width="853" height="480" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
		},
		{
			original: "vimeo.com/87007946",
			expected: '<iframe class="smark vimeo" src="https://player.vimeo.com/video/87007946?title=1&byline=1&portrait=1" frameborder="0" width="853" height="480" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
		}
	],
	"vimeoOptions": [
		{
			original: "https://vimeo.com/87007946",
			expected: '<iframe class="smark vimeo" src="https://player.vimeo.com/video/87007946?title=0&byline=0&portrait=0" frameborder="0" width="853" height="480" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
		},
		{
			original: "http://vimeo.com/87007946",
			expected: '<iframe class="smark vimeo" src="https://player.vimeo.com/video/87007946?title=0&byline=0&portrait=0" frameborder="0" width="853" height="480" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
		},
		{
			original: "vimeo.com/87007946",
			expected: '<iframe class="smark vimeo" src="https://player.vimeo.com/video/87007946?title=0&byline=0&portrait=0" frameborder="0" width="853" height="480" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
		}
	],
	"image": [
		{
			original: "http://vignette2.wikia.nocookie.net/bravestwarriors/images/2/2f/CatbugShameCone.jpg",
			expected: '<img class="smark image" title="" src="http://vignette2.wikia.nocookie.net/bravestwarriors/images/2/2f/CatbugShameCone.jpg">'
		},
		{
			original: 'http://vignette2.wikia.nocookie.net/bravestwarriors/images/2/2f/CatbugShameCone.jpg -title="I\'m Catbug!"',
			expected: '<img class="smark image" title="I&#8217;m Catbug!" src="http://vignette2.wikia.nocookie.net/bravestwarriors/images/2/2f/CatbugShameCone.jpg">'
		},
		{
			original: 'http://vignette2.wikia.nocookie.net/bravestwarriors/images/2/2f/CatbugShameCone.jpg -title="I\'m Catbug!"(https://www.youtube.com/watch?v=rFWb7DG7zTc)',
			expected: '<a href="https://www.youtube.com/watch?v=rFWb7DG7zTc" target=_blank><img class="smark image" title="I&#8217;m Catbug!" src="http://vignette2.wikia.nocookie.net/bravestwarriors/images/2/2f/CatbugShameCone.jpg"></a>'
		}
	],
	"link": [
		{
			original: "http://motherfuckingwebsite.com/",
			expected: '<iframe class="smark website" src="http://motherfuckingwebsite.com/" width="853" height="480" frameborder="0"></iframe>'
		},
		{
			original: "mochajs.org/index.html",
			expected: '<iframe class="smark website" src="mochajs.org/index.html" width="853" height="480" frameborder="0"></iframe>'
		}
	]
};

// HTML output test
describe("Paragraphs: ", function(){
	for (let category in paragraphTestCases){
		for (let i=0; i<paragraphTestCases[category].length; i++){
			paragraphTestCases[category][i].expectedWithP = '<p class="smark paragraph">' + paragraphTestCases[category][i].expected + "</p>";
		}
	}

	describe("Links", function(){
		it("should be parsed into <a> tags.", function(){
			for (let i=0; i<paragraphTestCases.links.length; i++){
				assert.equal(smark.generate(paragraphTestCases.links[i].original).html, paragraphTestCases.links[i].expectedWithP);
			}
		});
	});

	describe("Blockquotes", function(){
		it("should be parsed into <blockquote> tags", function(){
			for (let i=0; i<paragraphTestCases.blockquotes.length; i++){
				assert.equal(smark.generate(paragraphTestCases.blockquotes[i].original).html, paragraphTestCases.blockquotes[i].expectedWithP);
			}
		});
	});

	describe("Lists", function(){
		it("should be parsed into <ul> or <ol> tags", function(){
			for (let i=0; i<paragraphTestCases.lists.length; i++){
				assert.equal(smark.generate(paragraphTestCases.lists[i].original).html, paragraphTestCases.lists[i].expectedWithP);
			}
		});
	});

	describe("Headings", function(){
		it("should be parsed into <h1> to <h6> tags", function(){
			for (let i=0; i<paragraphTestCases.headings.length; i++){
				assert.equal(smark.generate(paragraphTestCases.headings[i].original).html, paragraphTestCases.headings[i].expectedWithP);
			}
		});
	});

	describe("Horizontal rules", function(){
		it("should be parsed into <hr /> tag", function(){
			for (let i=0; i<paragraphTestCases.horizontalRules.length; i++){
				assert.equal(smark.generate(paragraphTestCases.horizontalRules[i].original).html, paragraphTestCases.horizontalRules[i].expectedWithP);
			}
		});
	});

	// Typography test
	describe("Typographic", function(){
		describe("N-dashes", function(){
			it("should be coverted if it means between two things", function(){
				assert.equal(smark.generate(paragraphTestCases.ndash[0].original).html, paragraphTestCases.ndash[0].expectedWithP);
				assert.equal(smark.typographicChanges(paragraphTestCases.ndash[0].original), paragraphTestCases.ndash[0].expected);
			});
			it("should not be coverted if it link words together", function(){
				assert.equal(smark.generate(paragraphTestCases.ndash[1].original).html, paragraphTestCases.ndash[1].expectedWithP);
				assert.equal(smark.typographicChanges(paragraphTestCases.ndash[1].original), paragraphTestCases.ndash[1].expected);
			});
		});

		describe("Quotemarks", function(){
			it("should be converted into HTML entities for proper quotemarks", function(){
				for (let i=0; i<paragraphTestCases.quotemarks.length; i++){
					assert.equal(smark.generate(paragraphTestCases.quotemarks[i].original).html, paragraphTestCases.quotemarks[i].expectedWithP);
					assert.equal(smark.typographicChanges(paragraphTestCases.quotemarks[i].original), paragraphTestCases.quotemarks[i].expected);
				}
			});
		});

		describe("Apostrophes", function(){
			it("should be converted into HTML entities for proper apostrophes", function(){
				for (let i=0; i<paragraphTestCases.apostrophes.length; i++){
					assert.equal(smark.generate(paragraphTestCases.apostrophes[i].original).html, paragraphTestCases.apostrophes[i].expectedWithP);
					assert.equal(smark.typographicChanges(paragraphTestCases.apostrophes[i].original), paragraphTestCases.apostrophes[i].expected);
				}
			});
		});

		describe("Ellipses", function(){
			it("should be converted into HTML entities for proper ellipses", function(){
				for (let i=0; i<paragraphTestCases.ellipses.length; i++){
					assert.equal(smark.generate(paragraphTestCases.ellipses[i].original).html, paragraphTestCases.ellipses[i].expectedWithP);
					assert.equal(smark.typographicChanges(paragraphTestCases.ellipses[i].original), paragraphTestCases.ellipses[i].expected);
				}
			});
		});

		describe("Concatenations", function(){
			it("should be formatted properly (standard as per Phil Baines wisdom)", function(){
				for (let i=0; i<paragraphTestCases.concatenations.length; i++){
					assert.equal(smark.generate(paragraphTestCases.concatenations[i].original).html, paragraphTestCases.concatenations[i].expectedWithP);
					assert.equal(smark.typographicChanges(paragraphTestCases.concatenations[i].original), paragraphTestCases.concatenations[i].expected);
				}
			});
		});
	});
});

// Embeded tags test
describe("Embeded tags: ", function(){
	describe("Youtube links", function(){
		it("should be parsed into Youtube's embed link with the right base64 ID", function(){
			for (let i=0; i<embededTestCases.youtube.length; i++){
				assert.equal(smark.generate(embededTestCases.youtube[i].original).html, embededTestCases.youtube[i].expected);
			}
		});
	});

	describe("Vimeo links", function(){
		it("should be parsed into Vimeo's embed link with the right ID", function(){
			for (let i=0; i<embededTestCases.vimeo.length; i++){
				assert.equal(smark.generate(embededTestCases.vimeo[i].original).html, embededTestCases.vimeo[i].expected);
			}
		});

		it("should be parsed into Vimeo's embed link with right ID and without title and user name", function(){
			for (let i=0; i<embededTestCases.vimeoOptions.length; i++){
				assert.equal(smark.generate(embededTestCases.vimeoOptions[i].original, {
					"vimeoPortrait": false,
					"vimeoTitle": false,
					"vimeoByline": false
				}).html, embededTestCases.vimeoOptions[i].expected);
			}
		});
	});

	describe("Image links", function(){
		it("should be parsed into <img> tags", function(){
			for (let i=0; i<embededTestCases.image.length; i++){
				assert.equal(smark.generate(embededTestCases.image[i].original).html, embededTestCases.image[i].expected);
			}
		});
	});

	describe("General links", function(){
		it("should be parsed into <iframe> tags", function(){
			for (let i=0; i<embededTestCases.link.length; i++){
				assert.equal(smark.generate(embededTestCases.link[i].original).html, embededTestCases.link[i].expected);
			}
		});
	});
});

// Type detection test
describe("Type detection: ", function(){
	describe("Youtube", function(){
		it("should detect type correctly as 'youtube'", function(){
			for (let i=0; i<embededTestCases.youtube.length; i++){
				assert.equal(smark.generate(embededTestCases.youtube[i].original).type, "youtube");
			}
			for (let i=0; i<embededTestCases.youtube.length; i++){
				assert.equal(smark.generate(embededTestCases.youtube[i].original, {type: "youtube"}).type, "youtube");
			}
		});
	});

	describe("Vimeo", function(){
		it("should detect type correctly as 'vimeo'", function(){
			for (let i=0; i<embededTestCases.vimeo.length; i++){
				assert.equal(smark.generate(embededTestCases.vimeo[i].original).type, "vimeo");
			}
			for (let i=0; i<embededTestCases.vimeo.length; i++){
				assert.equal(smark.generate(embededTestCases.vimeo[i].original, {type: "vimeo"}).type, "vimeo");
			}
		});
	});

	describe("Image", function(){
		it("should detect type correctly as 'image'", function(){
			for (let i=0; i<embededTestCases.image.length; i++){
				assert.equal(smark.generate(embededTestCases.image[i].original).type, "image");
			}
			for (let i=0; i<embededTestCases.image.length; i++){
				assert.equal(smark.generate(embededTestCases.image[i].original, {type: "image"}).type, "image");
			}
		});
	});

	describe("Links", function(){
		it("should detect type correctly as 'link'", function(){
			for (let i=0; i<embededTestCases.link.length; i++){
				assert.equal(smark.generate(embededTestCases.link[i].original).type, "link");
			}
			for (let i=0; i<embededTestCases.link.length; i++){
				assert.equal(smark.generate(embededTestCases.youtube[i].original, {type: "link"}).type, "link");
			}
		});
	});

	describe("Paragraphs", function(){
		it("should detect type correctly as 'paragraph'", function(){
			for (let testCase in paragraphTestCases){
				for (let i=0; i<paragraphTestCases[testCase].length; i++){
					assert.equal(smark.generate(paragraphTestCases[testCase][i].original).type, "paragraph");
				}
			}
		});
	});
});