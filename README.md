Easy-url
=========

lightweight library for manipulation querystring

## Installation

    npm install easy-url

## Usage

    import Url form 'easy-url'
    window.url = New Url()

## API
### push method
    Updates querystring in your url

    url.push('search', 'foo')
    console.log(location.href) => http://your-site.com?search=foo

    url.push({search: 'foo', page: 5})
    console.log(location.href) => http://your-site.com/home?search=foo&page=5

### clear method
    Removes params from your url

    console.log(location.href) => http://site.com/home?foo=1&bar=2&maz=3

    url.clear('maz')
    console.log(location.href) => http://site.com/home?foo=1&bar=2

    url.clear()
    console.log(location.href) => http://site.com/home

### obj property
    Contains all data from querystring

    console.log(location.href) => http://site.com/home?foo=1&bar=2&maz=3

    console.log(url.obj) => {foo: '1', bar: '2', maz: '3'}

### search property
    Contains querystring

    console.log(location.href) => http://site.com/home?foo=1&bar=2&maz=3

    console.log(url.search) => '?foo=1&bar=2&maz=3'

### on method
    register listener on url change
    returns unsubscribe function

    let off = url.on(function() {console.log('querystring was updated')})

    url.push('key', 'value') => your will see 'querystring was updated' in the console

### off method
    removes listener

    function callback() {/.../}

    url.on(callback)
    url.off(callback)

### once method
    register listener that will fire only once
