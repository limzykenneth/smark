var assert = require("chai").assert;
var smark = require("../smark.js");

var sanity = "The quick brown fox jumps over the lazy dog. THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.";
var	sanityR = '<p class="smark paragraph">' + sanity + "</p>";

describe("For the sake of sanity,", function(){
	it('should return the same thing except for being wrapped in <p> tags', function(){
		assert.equal(smark.generate(sanity).html, sanityR);
	});
	it('should be of type "paragraph"', function(){
		assert.equal(smark.generate(sanity).type, "paragraph");
	});
});
