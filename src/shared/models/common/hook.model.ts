import { RefObject, useRef } from "react";

export class SmartRef<T> {
    private readonly _listeners = new Set<(prev: T, curr: T) => void>();
    private readonly _ref: RefObject<T>;

    constructor(value: T) {
        this._ref = useRef(value);
    }

    get current(): T {
        return this._ref.current;
    }

    set current(value: T) {
        if (this._ref.current === value) return;
        const prev = this._ref.current;
        this._ref.current = value;
        this._listeners.forEach((callback) => { callback(prev, this._ref.current); });
    };

    subscribe(callback: (prev: T, curr: T) => void): () => void {
        this._listeners.add(callback);
        return () => { this._listeners.delete(callback) };
    };
}
