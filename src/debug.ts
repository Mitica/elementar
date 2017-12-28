
const Debug = require('debug')('elementar');

export default function debug(...params: any[]) {
    Debug.apply(Debug, params);
}
