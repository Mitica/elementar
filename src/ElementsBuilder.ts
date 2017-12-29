
import debug from './debug';
import { IElement, Element } from './Element';
import { ELEMENTAR_OPTIONS, ElementarOptions } from './options';
import { buildElement } from './element-builders';

export class ElementsBuilder {
    private options: ElementarOptions

    constructor(options?: ElementarOptions) {
        this.options = { ...ELEMENTAR_OPTIONS, ...options }
    }

    build(nodes: CheerioElement[]): IElement[] {
        return this.buildElements(nodes, []);
    }

    private buildElements(nodes: CheerioElement[], elements: IElement[]): IElement[] {
        nodes.forEach(node => {
            const element = buildElement(node, this.options);
            if (!element) {
                debug(`not created element: ${node.name}`);
                return;
            }
            // some nodes can be invalid and be a special element: an youtube iframe
            if (!element.isContent && !this.isValidNode(node)) {
                debug(`invalid node: ${node.name}`);
                return;
            }
            if (!element.isLeaf) {
                this.buildElements(node.children, element.children);
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
                last.addData(element.text());
            } else {
                elements.push(element);
            }

            return true;
        }

        // ignore element
        if (!element.isContent && this.options.ignoreElements.test(element.name)) {
            if (!element.isLeaf) {
                debug(`Add childs of a Ignored elemenet: ${element.name}`);
                element.children.forEach(child => this.addElement(elements, child));
            }
            return false;
        }

        elements.push(element);

        return true;
    }

    private isValidElement(element: IElement) {
        return element.hasContent() || this.options.emptyElements.test(element.name);
    }

    private isValidNode(node: CheerioElement) {
        if (node.type === 'text') {
            return true;
        }
        if (node.type === 'tag' && !this.options.invalidElements.test(node.name)) {
            return true;
        }

        return false;
    }
}
