require('assert');
let Filter = require('../lib/badwords.js'),
	filter = new Filter(),
	assert = require('better-assert');

describe('filter', function(){
	describe('isProfane',function(){
		it("Should detect a bad word and return a boolean value",function(){
			assert(filter.isProfane("ash0le"));
		});

		it("Should return false when no bad word is detected",function(){
			assert(filter.isProfane("wife") === false);
		});

		it("Should return false for substring that is non-profane",function(){
				assert(filter.isProfane("japanese") === false);
		});

    it("Should detect this slur",function(){
      assert(filter.isProfane("jap"));
    });

    it("Should return false for substring that is a legitimate last name",function(){
      assert(filter.isProfane("Holcum") === false);
    });

    it("Should detect an exact match of a word that is bad by itself",function(){
      assert(filter.isProfane("cum"));
    });

		it("Should be able to detect a bad word in a sentence",function(){
			assert(filter.isProfane("that person is an ash0le"));
		});

		it('Filters out special characters appropriately', function() {
			assert(filter.isProfane("You're an asshole^ you are"));
		});

		it('Should detect filtered words from badwords-list', function(){
			assert(filter.isProfane('willies'));
		});

		it('Should detect filtered words regardless of type case', function() {
			let filter = new Filter({
				list: ['Test']
			});
			assert(filter.isProfane('test'));
		});

		it('Should only detect words from custom list', function() {
			let filter = new Filter({
				list: ['test']
			});
			assert(filter.isProfane('test') && !filter.isProfane('fuck'));
		});

		it('Should detect words from custom list and default list', function() {
			let filter = new Filter({
				addList: ['test']
			});
			assert(filter.isProfane('test') && filter.isProfane('fuck'));
		});
	});
});
