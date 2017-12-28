
import { ElementsBuilder } from './ElementsBuilder';
import test from 'ava';
import { cheerioFromHTML } from './utils';

test('buildElements', t => {
    const $ = cheerioFromHTML('<div> some <span></span>text <p>in P text</p></div>');

    const builder = new ElementsBuilder();

    const elements = builder.build($.toArray());
    console.log(JSON.stringify(elements))

    t.is(!!elements, true, 'elements must be valid');
});
