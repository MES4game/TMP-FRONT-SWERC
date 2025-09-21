import { useState } from "react";
import { SmartRef } from "@/shared/models/common/hook.model";

export function useSmartRef<T>(value: T): SmartRef<T> {
    return new SmartRef(value);
}

export function useReRender(): (..._args: unknown[]) => void {
    const [_, reRender] = useState(false);
    return (..._args: unknown[]) => { reRender((prev) => { return !prev; }) };
}
