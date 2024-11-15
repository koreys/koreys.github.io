const Image = require("@11ty/eleventy-img")
const path = require('path')

module.exports = config => {
	config.addShortcode("image", async (src, alt, widths = [300, 600], sizes = "100vh") => {
        console.log(`Generating images from ${src}`)
        let metadata = await Image(src, { 
            widths: [600, 900, 1500], 
            formats: ["jpeg", "webp"],
            outputDir: "./_site/images/",
            urlPath: "/images/",
            filenameFormat: function (id, src, width, format, options) {
				const extension = path.extname(src)
				const name = path.basename(src, extension)
				return `${name}-${width}w.${format}`
			}
        })

        let imageAttributes = {
            alt,
            sizes,
            loading: "lazy",
            decoding: "async"
        }

        
        return Image.generateHTML(metadata, imageAttributes)
    })

    config.addPassthroughCopy('./src/assets/css/')
    config.addPassthroughCopy('./src/assets/fontawesome/')
    config.addPassthroughCopy('./src/assets/fonts/')

    // Returns post items, sorted by date
    config.addCollection('posts', collection => {
        return collection
        .getFilteredByGlob('./src/posts/*.md')
        .sort((a, b) => (Number(a.data.date) > Number(b.data.date) ? 1 : -1))
    })
 
    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: 'src',
            output: '_site'
        }
    }
}

//switch to ESM
/*
// Any combination of these
import { I18nPlugin, RenderPlugin, HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  // …
};

*/