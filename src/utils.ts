
import * as cheerio from 'cheerio';

export function cheerioFromHTML(html: string) {
    const BODY_ID = 'yvnoiuheo8yto84t934yvt893u489tv';
    const $ = cheerio.load(`<div id="${BODY_ID}">${html}</div>`, {
        decodeEntities: true,
        lowerCaseAttributeNames: true,
        lowerCaseTags: true,
        recognizeSelfClosing: true
    });

    const el = $.root().find('#' + BODY_ID).children();
    el.each((_, element) => {
        element.parent = null
        element.parentNode = null;
    });

    return el;
}
