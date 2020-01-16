const {
    stripScript,
    stripTemplate,
    genInlineComponentText
} = require('./utils');
const md = require('./config')

module.exports = function(source) {
    let content = md.render(source)
    content = content.replace(/<pre><code class="language-html">/g, '<template slot="highlight"><pre v-pre><code class="html">').replace(/<\/pre>/g, '</pre></template>')
    const startTag = '<!--demo:';
    const startTagLen = startTag.length;
    const endTag = ':-demo-->';
    const endTagLen = endTag.length;

    let componentsString = '';
    let id = 0; // demo 的 id
    let output = []; // 输出的内容
    let start = 0; // 字符串开始位置

    let commentStart = content.indexOf(startTag)
    let commentEnd = content.indexOf(endTag, commentStart + startTagLen)
    while (commentStart !== -1 && commentEnd !== -1) {
        output.push(content.slice(start, commentStart))
        const commentContent = content.slice(commentStart + startTagLen, commentEnd)
        const html = stripTemplate(commentContent)
        const script = stripScript(commentContent)
        let demoComponentContent = genInlineComponentText(html, script)
        const demoComponentName = `firm-demo${id}`
        output.push(`<template slot="source"><${demoComponentName} /></template>`);
        componentsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`

        // 重新计算下一次的位置
        id++
        start = commentEnd + endTagLen
        commentStart = content.indexOf(startTag, start)
        commentEnd = content.indexOf(endTag, commentStart + startTagLen)
    }

    let pageScript = ''
    if (componentsString) {
        pageScript = `<script>
      export default {
        name: 'component-exhibition',
        components: {
          ${componentsString}
        }
      }
    </script>`;
    }

    output.push(content.slice(start))
    return `
    <template>
      <div>
        ${output.join('')}
      </div>
    </template>
    ${pageScript}
  `;
};
