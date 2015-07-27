var expect = require('chai').expect
  , client = require('utilise.client')
  , shim = !client && polyfill()
  , raw = require('./')
  , is = require('utilise.is')
  , node 

describe('raw', function() {

  before(function(){
    /* istanbul ignore else */
    if (!client) { node = document.body.firstElementChild }
    else {
      node = document.body.appendChild(document.createElement('div'))
      node.className = 'class'
      node.appendChild(document.createElement('li')).className = 'sub 1'
    }
  })

  it('should call querySelector with selector', function(){
    expect(raw('.sub', node).className).to.be.eql('sub 1')
  })

  it('should call querySelector with selector and global document', function(){
    expect(raw('.class .sub').className).to.be.eql('sub 1')
  })

 it('should pierce boundaries if supports shadow dom', function(){
    var realShadow = document.head.createShadowRoot
      , realQuery = document.querySelector
      , result 

    document.querySelector = function(selector){ result = selector; return [] }
    document.head.createShadowRoot = true
    raw('.class li')
    expect(result).to.be.eql('html /deep/ .class li')

    document.head.createShadowRoot = realShadow
    document.querySelector = realQuery
  })

})

function polyfill(){
  window = require("jsdom").jsdom('<div class="class"><li class="sub 1"></li></div>').defaultView
  global.document = window.document
}