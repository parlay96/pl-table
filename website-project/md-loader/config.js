const Config = require('markdown-it-chain')
const anchor = require('markdown-it-anchor')
const containers = require('./containers')
const slugify = require('transliteration').slugify
const config = new Config()

config
    .options.html(true).end()
    .plugin('anchor').use(anchor, [
    {
        permalinkSymbol:'#',
        permalink: true,
        permalinkBefore: true,
        level: 2,
        slugify: slugify,
    }
]).end()
    .plugin('containers').use(containers).end()

const md = config.toMd()
module.exports = md
