
import { fromHtml } from './Elementar';
import test from 'ava';

test('#html', t => {
    let elementar = fromHtml('<p><strong>Here</strong> is the <i>answer</i>!<span></span></p>');
    t.is(elementar.html(), '<p>Here is the answer!</p>', 'simple ignore elements');

    elementar = fromHtml('<p><strong>Here</strong> is the <i>answer</i>!<span>  </span></p>');
    t.is(elementar.html(), '<p>Here is the answer!</p>', 'ignore empty texts');
});

test('#xml', t => {
    let elementar = fromHtml('<p><strong>Here</strong> is the <i>answer</i>!<span></span></p>');
    t.is(elementar.xml(), '<p><text>Here is the answer!</text></p>');
});

test('#text', t => {
    let elementar = fromHtml('<p><strong>Here</strong> is the <i>answer</i>!<span></span></p>');
    t.is(elementar.text(), 'Here is the answer!');
});
