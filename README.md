# Site-preview
Node module to get information such as title, description and images from a webpage.  
Site-preview uses html metadata and standards such as open-graph and twitter-cards to generate summary of the webpage.  
## Installation
`$ npm install site-preview`
## Usage
```js
const sitePreview = require("site-preview");

sitePreview.fromURL("https://www.github.com/",function (data) {
    console.log(data)
});
```
Output:
```json
{
    title: 'GitHub',
    favicon: 'https://github.githubassets.com/favicon.ico',
    description: 'GitHub is where people build software. More than 36 million people use GitHub to discover, fork, and contribute to over 100 million projects.',
    image: 'https://github.githubassets.com/images/modules/open_graph/github-octocat.png',
    url: 'https://github.com',
    site: 'github',
    author: 'github'
}
```
alternatively you could also use 
```js
sitePreview.fromText(data)
```
