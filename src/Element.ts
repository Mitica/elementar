
import { XmlEncode } from './xml';
import debug from './debug';
import { ElementBuildData } from './options';

export type ElementProps = { [index: string]: string }

export type ElementType = 'text' | 'tag';

export interface IElement {
    readonly type: ElementType
    readonly name: string
    readonly props: ElementProps
    readonly isContent: boolean
    readonly isLeaf: boolean
    readonly data?: string
    readonly children: IElement[]
    xml(): string
    text(): string
    html(): string
    prop(name: string, value?: string): string
    hasContent(): boolean
    isText(): boolean
    isTag(): boolean
    addData(data: string): string
}

export interface ElementContructorData {
    props?: ElementProps
    isContent?: boolean
    isLeaf?: boolean
    data?: string
    children?: IElement[]
}

export class Element implements IElement {
    readonly type: ElementType
    readonly name: string
    readonly props: ElementProps
    readonly isContent: boolean
    readonly isLeaf: boolean
    data?: string
    readonly children: IElement[]

    constructor(type: ElementType, name?: string, data?: ElementContructorData) {
        if (['text', 'tag'].indexOf(type) < 0) {
            throw new Error(`Element type is invalid!`);
        }
        this.type = type;
        if (type === 'text') {
            name = 'text';
        }

        if (typeof name !== 'string' || name.trim().length < 1) {
            throw new Error(`Element name is invalid!`);
        }
        this.name = name.trim().toLowerCase();

        data = data || {};
        if (this.type === 'text') {
            this.isContent = true;
            this.isLeaf = true;
        } else {
            this.props = data.props || {};
            this.isContent = typeof data.isContent === 'boolean' ? data.isContent : false;
            this.isLeaf = typeof data.isLeaf === 'boolean' ? data.isLeaf : false;
        }
        if (data.data) {
            this.data = data.data;
        }
        if (this.type === 'tag' && !this.isLeaf) {
            this.children = Array.isArray(data.children) ? data.children : [];
        }
    }

    isText(): boolean {
        return this.type === 'text';
    }
    isTag(): boolean {
        return this.type === 'tag';
    }

    text(): string {
        if (this.isText()) {
            return this.data || '';
        }
        if (this.children) {
            return this.children.map(item => item.text()).join('');
        }
        return '';
    }

    hasContent(): boolean {
        if (this.isText()) {
            return !!this.data;
        }
        return this.isContent || this.children && !!this.children.find(item => item.hasContent());
    }

    prop(name: string, value?: string): string {
        if (typeof name !== 'string' || !name) {
            throw new Error(`'name' parameter is invalid`);
        }
        if (value === null) {
            delete this.props[name];
        } else if (value !== undefined) {
            this.props[name] = value;
        }

        return this.props[name];
    }

    xml(): string {
        if (this.type === 'text') {
            return `<text>${XmlEncode(this.text())}</text>`;
        }

        const content = this.children && this.children.map(item => item.xml()).join('');
        let props = '';
        if (this.props && Object.keys(this.props).length) {
            props = ' ' + Object.keys(this.props).map(prop => `${prop}="${XmlEncode(this.props[prop])}"`).join(' ');
        }
        if (content) {
            return `<${this.name}${props}>${content}</${this.name}>`;
        }
        return `<${this.name}${props} />`;
    }
    html(): string {
        if (this.isText()) {
            return XmlEncode(this.text());
        }

        const content = this.children && this.children.map(item => item.html()).join('');
        let props = '';
        if (this.props && Object.keys(this.props).length) {
            props = ' ' + Object.keys(this.props).map(prop => `${prop}="${XmlEncode(this.props[prop])}"`).join(' ');
        }
        if (content) {
            return `<${this.name}${props}>${content}</${this.name}>`;
        }
        return `<${this.name}${props} />`;
    }

    addData(data: string): string {
        return this.data += data;
    }
}

export class TagElement extends Element {
    constructor(name: string, data?: ElementContructorData) {
        super('tag', name, data);
    }
}

export class TextElement extends Element {
    constructor(data?: ElementContructorData) {
        super('text', 'text', data);
    }
}

export function buildElementFromData(data: ElementBuildData) {
    return new TagElement(data.name, data);
}
