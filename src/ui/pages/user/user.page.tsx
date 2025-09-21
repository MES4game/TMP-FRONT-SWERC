import { FC, ReactNode, useEffect } from "react";
import "@/ui/pages/user/user.page.css";

const UserPage: FC = (): ReactNode => {
    useEffect(() => {
        console.log("Loaded: UserPage");
    }, []);

    useEffect(() => {
        console.log("Rendered: UserPage");
    });

    return (
        <p>SWERC: TODO</p>
    );
}

export default UserPage;
