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

var sources = {
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

// HTML output test
describe("Paragraphs: ", function(){
	for (var category in sources){
		for (var i=0; i<sources[category].length; i++){
			sources[category][i].expected = '<p class="smark paragraph">' + sources[category][i].expected + "</p>";
		}
	}

	describe("Links", function(){
		it("should be parsed into <a> tags.", function(){
			for (var i=0; i<sources.links.length; i++){
				assert.equal(smark.generate(sources.links[i].original).html, sources.links[i].expected);
			}
		});
	});

	describe("Blockquotes", function(){
		it("should be parsed into <blockquote> tags", function(){
			for (var i=0; i<sources.blockquotes.length; i++){
				assert.equal(smark.generate(sources.blockquotes[i].original).html, sources.blockquotes[i].expected);
			}
		});
	});

	describe("Lists", function(){
		it("should be parsed into <ul> or <ol> tags", function(){
			for (var i=0; i<sources.lists.length; i++){
				assert.equal(smark.generate(sources.lists[i].original).html, sources.lists[i].expected);
			}
		});
	});

	describe("Headings", function(){
		it("should be parsed into <h1> to <h6> tags", function(){
			for (var i=0; i<sources.headings.length; i++){
				assert.equal(smark.generate(sources.headings[i].original).html, sources.headings[i].expected);
			}
		});
	});

	describe("Horizontal rules", function(){
		it("should be parsed into <hr /> tag", function(){
			for (var i=0; i<sources.horizontalRules.length; i++){
				assert.equal(smark.generate(sources.horizontalRules[i].original).html, sources.horizontalRules[i].expected);
			}
		});
	});

	// Typography test
	describe("Typographic", function(){
		describe("N-dashes", function(){
			it("should be coverted if it means between two things", function(){
				assert.equal(smark.generate(sources.ndash[0].original).html, sources.ndash[0].expected);
			});
			it("should not be coverted if it link words together", function(){
				assert.equal(smark.generate(sources.ndash[1].original).html, sources.ndash[1].expected);
			});
		});

		describe("Quotemarks", function(){
			it("should be converted into HTML entities for proper quotemarks", function(){
				for (var i=0; i<sources.quotemarks.length; i++){
					assert.equal(smark.generate(sources.quotemarks[i].original).html, sources.quotemarks[i].expected);
				}
			});
		});

		describe("Apostrophes", function(){
			it("should be converted into HTML entities for proper apostrophes", function(){
				for (var i=0; i<sources.apostrophes.length; i++){
					assert.equal(smark.generate(sources.apostrophes[i].original).html, sources.apostrophes[i].expected);
				}
			});
		});

		describe("Ellipses", function(){
			it("should be converted into HTML entities for proper ellipses", function(){
				for (var i=0; i<sources.ellipses.length; i++){
					assert.equal(smark.generate(sources.ellipses[i].original).html, sources.ellipses[i].expected);
				}
			});
		});

		describe("Concatenations", function(){
			it("should be formatted properly (standard as per Phil Baines wisdom)", function(){
				for (var i=0; i<sources.concatenations.length; i++){
					assert.equal(smark.generate(sources.concatenations[i].original).html, sources.concatenations[i].expected);
				}
			});
		});
	});
});

// Type detection test
