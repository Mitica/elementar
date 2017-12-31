
import { fromHtml } from './Elementar';
import test from 'ava';

test('#html', t => {
    let elementar = fromHtml('<p><strong>Here</strong> is the <i>answer</i>!<span></span></p>');
    t.is(elementar.html(), '<p>Here is the answer!</p>', 'simple ignore elements');

    elementar = fromHtml('<p><strong>Here</strong> is the <i>answer</i>!<span> </span></p>');
    t.is(elementar.html(), '<p>Here is the answer! </p>', 'ignore empty texts');
});

test('#xml', t => {
    let elementar = fromHtml('<p><strong>Here</strong> is the <i>answer</i>!<span></span></p>');
    t.is(elementar.xml(), '<p><text>Here is the answer!</text></p>');
});

test('#text', t => {
    let elementar = fromHtml('<p><strong>Here</strong> is the <i>answer</i>!<span></span></p>');
    t.is(elementar.text(), 'Here is the answer!');
});

test('ignore parent with no direct content children', t => {
    const elementar = fromHtml('<div class="row"><div class="col">Col1</div><div class="col">Col2</div></div>');

    t.is(elementar.html(), '<div>Col1</div><div>Col2</div>', '2 root elements');
    t.is(elementar.text(), 'Col1Col2', 'concat text');
});
