const request = require('request');
const cheerio = require('cheerio');
const attrs = ["title", "description", "keywords", "site_name", "url", "image", "video", "type", "audio", "author"];
const ogAttrs = ["og:title", "og:type", "og:description", "og:image", "og:url", "og:title", "og:audio", "og:video", "og:sitename", "twitter:site", "twitter:creator", "twitter:description", "twitter:title", "twitter:image", "twitter:player"]

exports.fromText = function(text) {
    let data = {};
    let meta = {};
    let $ = cheerio.load(text);
    data["title"] = $("title").text();
    $("link").each(function (i, elem) {
        try {
            if ($(elem).attr("rel").indexOf("icon") !== -1 || $(elem).attr("type").split("/").includes("image")) {
                data["favicon"] = $(elem).attr("href")
            }
        } catch (e) {
        }
    });

    $("meta").each(function (i, elem) {
        if (elem.attribs["name"] !== undefined) {
            meta[elem.attribs["name"]] = elem.attribs["content"]
        } else if (elem.attribs["property"] !== undefined) {
            meta[elem.attribs["property"]] = elem.attribs["content"]
        }

    });

    attrs.forEach(function (item, index) {

        if (meta[item] !== undefined) {
            data[item] = meta[item]
        }
    });

    ogAttrs.forEach(function (item, index) {

        if (meta[item] !== undefined) {
            data[item.split(":")[1]] = meta[item]
        }
    });

    if (data["creator"] !== undefined) {
        data["author"] = data["creator"];
        delete data["creator"]
    }
    return data
};

exports.fromURL = function (url, callback) {
    request(url, function (error, response, body) {
        if (error){
            callback(error)
        }
        else{
        callback(exports.fromText(body))
        }
    });
};