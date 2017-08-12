Easy-url
=========

lightweight library for manipulation querystring

## Installation

    npm install easy-url

## Usage

    import Url form 'easy-url'
    window.url = New Url()

    url.push('search', 'foo') => http://site.com/home?search=foo

    url.clear() => http://site.com/home

    url.push({search: 'foo', page: 5}) => http://site.com/home?search=foo&page=5

    console.log(url.obj) => {search: 'foo', page: '5'}

    console.log(url.search) => '?search=foo&page=5'
