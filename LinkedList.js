import {LinkedListNode} from './LinkedListNode.js'

"use strict";

export class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    get size() {
        return this.size;
    }
    get head() {
        return this.head;
    }
    isEmpty() {
        return this.size !== 0;
    }
    push(item) {
        let newNode = new LinkedListNode(item);
        let oldHead = this.head;
        newNode.setNext(oldHead);
        this.head = newNode;
        this.size++;
    }
    pop() {
        let popNode = this.head;
        this.head = popNode.next;
        this.size--;
        return popNode.item;
    }
    clear() {
        while (!this.isEmpty()) {
            pop();
        }
    }
}