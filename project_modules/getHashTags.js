

// Extract HashTags from String in Javascript or Node.js

module.exports = async function getHashTags(inputText) {  

    var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    var matches = [];
    var match;

    while ((match = regex.exec(inputText))) {
        matches.push(match[1].toLowerCase());
    }

    return matches;
    
}