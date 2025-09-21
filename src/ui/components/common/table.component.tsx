import { ReactNode, useEffect } from "react";
import { ComponentProps } from "@/shared/models/common/props.model";
import { SmartRef } from "@/shared/models/common/hook.model";
import { useReRender, useSmartRef } from "@/shared/utils/common/hook.util";
import "@/ui/components/common/table.component.css";

export interface TableHead<T> {
    key?: keyof T;
    item: ReactNode;
    color?: string;
}

interface TableCompProps<T> extends ComponentProps {
    elements: SmartRef<T[]>;
    default_sorting_field: keyof T;
    heads: TableHead<T>[];
    displayRowElement: (value: T, index: number) => ReactNode;
}

// eslint-disable-next-line @stylistic/comma-dangle
const TableComp = <T,>(props: TableCompProps<T>): ReactNode => {
    const reRender = useReRender();
    const sorted_field = useSmartRef<keyof T>(props.default_sorting_field);
    const ascending = useSmartRef<boolean>(true);

    function sortElements() {
        props.elements.current =
            [...props.elements.current]
            .sort((a, b) => { return (ascending.current ? 1 : -1) * (a[sorted_field.current] > b[sorted_field.current] ? 1 : -1); });
    }

    function handleSort(field: keyof T | undefined) {
        if (field === undefined) return;
        ascending.current = sorted_field.current === field ? !ascending.current : true;
        sorted_field.current = field;
        sortElements();
    }

    props.elements.subscribe(reRender);

    useEffect(() => {
        console.log("Loaded: TableComp");
    }, []);

    useEffect(() => {
        console.log("Rendered: TableComp");
    });

    return (
        <div className={`common-table ${props.className ?? ''}`} style={props.style}>
            <table>
                <thead>
                    <tr>
                        {props.heads.map((value, index) => {
                            return (
                                <th
                                    key={index}
                                    onClick={() => { handleSort(value.key) }}
                                    style={{ color: value.color ?? '' }}
                                >
                                    {value.item}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {props.elements.current.map(props.displayRowElement)}
                </tbody>
            </table>
        </div>
    );
}

export default TableComp;
