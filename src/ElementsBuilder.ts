
import debug from './debug';
import { IElement, TextElement, Element, ParentElement } from './element';
import { ELEMENTAR_OPTIONS } from './options';
import { buildElement } from './element-builders';

export interface ElementsBuilderOptions {
    // readonly omitElements?: RegExp
    readonly invalidNodes?: RegExp
    // readonly emptyElements?: RegExp
}

const OPTIONS: ElementsBuilderOptions = {
    invalidNodes: ELEMENTAR_OPTIONS.invalidNodes
}

export class ElementsBuilder {
    private options: ElementsBuilderOptions

    constructor(options?: ElementsBuilderOptions) {
        this.options = { ...OPTIONS, ...options }
    }

    build(nodes: CheerioElement[]): IElement[] {
        return this.buildElements(nodes, []);
    }

    private buildElements(nodes: CheerioElement[], elements: IElement[]): IElement[] {
        nodes.forEach(node => {
            if (!this.isValidNode(node)) {
                debug(`invalid node: ${node.name}`);
                return;
            }
            const element = buildElement(node);
            if (!element) {
                debug(`not created element: ${node.name}`);
                return;
            }
            if (element.isParent()) {
                this.buildElements(node.children, element.asParent().children);
            }
            this.addElement(elements, element);
        });

        return elements;
    }

    private addElement(elements: IElement[], element: IElement): boolean {
        if (!this.isValidElement(element)) {
            debug(`invalid element: ${element.name}`);
            return false;
        }
        if (element.isText()) {
            const last = elements.length && elements[elements.length - 1] || null;
            if (last && last.isText()) {
                last.asText().add(element.text());
                return
            }
        }

        elements.push(element);

        return true;
    }

    private isValidElement(element: IElement) {
        // return true;
        return element.hasContent();
    }

    private isValidNode(node: CheerioElement) {
        if (node.type === 'text') {
            return true;
        }
        if (node.type === 'tag' && !this.options.invalidNodes.test(node.name)) {
            return true;
        }

        return false;
    }
}
