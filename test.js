var expect = require('chai').expect
  , raw = require('./')
  , is = require('is')

describe('raw', function() {

  it('should call querySelector with selector', function(){
    var selector = '.class'
      , result 
      , fn = function(selector){ result = selector; }
      , doc = { querySelector: fn }

    raw(selector, doc)
    expect(result).to.equal(selector)
  })

  it('should call querySelector with selector and global document', function(){
    var selector = '.class'
      , result 
      , fn = function(selector){ result = selector; }
      , doc = { querySelector: fn }

    global.document = doc
    raw(selector)
    expect(result).to.equal(selector)
  })

})