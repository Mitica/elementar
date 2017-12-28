
import { XmlEncode } from './xml';

const CONTENT_ELEMENT_NAME_REG = /^text|img|meta$/;

export type ElementProps = { [index: string]: string }

export interface IElement {
    readonly name: string
    readonly props: ElementProps
    toXML(): string
    prop(name: string, value?: string): string
    hasContent(): boolean
}

export class Element implements IElement {
    readonly name: string
    readonly props: ElementProps
    readonly children: IElement[]

    constructor(name: string, props?: ElementProps) {
        if (typeof name !== 'string' || name.trim().length < 1) {
            throw new Error(`Element name is required!`);
        }
        this.name = name.trim().toLowerCase();
        this.props = props || {};
        this.children = [];
    }

    // addChild(child: IElement) {
    //     return this.children.push(child);
    // }

    hasContent(): boolean {
        return CONTENT_ELEMENT_NAME_REG.test(this.name)
            || !!this.children.find(item => item.hasContent());
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

    toXML(): string {
        const content = this.children.map(item => item.toXML()).join('');
        let props = '';
        if (this.props && Object.keys(this.props).length) {
            props = ' ' + Object.keys(this.props).map(prop => `${prop}="${XmlEncode(this.props[prop])}"`).join(' ');
        }
        if (content) {
            return `<${this.name}${props}>${XmlEncode(content)}</${this.name}>`;
        }
        return `<${this.name}${props} />`;
    }
}

export class TextElement extends Element {
    constructor(public content?: string, props?: ElementProps) {
        super('text', props);
    }

    toXML(): string {
        return `<text>${XmlEncode(this.content)}</text>`;
    }

    hasContent(): boolean {
        return true;
    }
}
