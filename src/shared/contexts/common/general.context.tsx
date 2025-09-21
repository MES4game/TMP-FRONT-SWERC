import { FC, ReactNode, createContext, useContext, useEffect } from "react";
import { SmartRef } from "@/shared/models/common/hook.model";
import { useSmartRef } from "@/shared/utils/common/hook.util";
import { mapUser, User } from "@/shared/models/user.model";
import { getSelf } from "@/api/user.api";

interface GeneralVarsType {
    token: SmartRef<string>;
    lang: SmartRef<string>;
    user: SmartRef<User>;
}

const GeneralVarsContext = createContext<GeneralVarsType | undefined>(undefined);

export interface GeneralVarsProviderProps {
    readonly children: ReactNode;
}

export const GeneralVarsProvider: FC<GeneralVarsProviderProps> = (props: GeneralVarsProviderProps): ReactNode => {
    const context_value: GeneralVarsType = {
        token: useSmartRef(""),
        lang:  useSmartRef("en"),
        user:  useSmartRef(mapUser({})),
    };

    context_value.token.subscribe((_, curr) => { sessionStorage.setItem('token', curr); });
    context_value.lang.subscribe((_, curr) => { localStorage.setItem('lang', curr); });
    context_value.token.subscribe((_, _curr) => { void (async () => { context_value.user.current = mapUser(await getSelf()); })(); });

    useEffect(() => {
        console.log("Loaded: GeneralVarsProvider");

        context_value.token.current = sessionStorage.getItem('token') ?? "";
        context_value.lang.current = localStorage.getItem('lang') ?? "en";
    }, []);

    useEffect(() => {
        console.log("Rendered: GeneralVarsProvider");
    });

    return (
        <GeneralVarsContext.Provider value={context_value}>
            {props.children}
        </GeneralVarsContext.Provider>
    );
};

export function useGeneralVars(): GeneralVarsType {
    const context = useContext(GeneralVarsContext);

    if (!context)
        throw new Error("useGeneralVars must be used within a GeneralVarsProvider");

    return context;
};
