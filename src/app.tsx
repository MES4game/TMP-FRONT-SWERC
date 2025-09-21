import { FC, lazy, ReactNode, useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useGeneralVars } from "@/shared/contexts/common/general.context";
import { useReRender } from "@/shared/utils/common/hook.util";
import LoadingComp from '@/ui/components/common/loading.component';
import NavbarComp from '@/ui/components/navbar/navbar.component';
import InfobarComp from '@/ui/components/infobar/infobar.component';
import "@/app.css";

const HomePage       = lazy(() => { return import('@/ui/pages/home/home.page'); });
const CodePage       = lazy(() => { return import('@/ui/pages/code/code.page'); });
const ProblemPage    = lazy(() => { return import('@/ui/pages/code/problem/problem.page'); });
const ScoreboardPage = lazy(() => { return import('@/ui/pages/scoreboard/scoreboard.page'); });
const UserPage       = lazy(() => { return import('@/ui/pages/user/user.page'); });
const NotFoundPage   = lazy(() => { return import('@/ui/pages/not_found.page'); });

const App: FC = (): ReactNode => {
    const { lang } = useGeneralVars();
    const reRender = useReRender();

    lang.subscribe(reRender);

    useEffect(() => {
        console.log("Loaded: App");
    }, []);

    useEffect(() => {
        console.log("Rendered: App");
    });

    return (
        <>
            <NavbarComp />
            <main id='main'>
                <Suspense fallback={<LoadingComp />}>
                    <Routes>
                        <Route path='/' element={ <HomePage /> } />
                        <Route path='/code' element={ <CodePage /> } />
                        <Route path='/problem/:id' element={ <ProblemPage /> } />
                        <Route path='/scoreboard' element={ <ScoreboardPage /> } />
                        <Route path='/user' element={ <UserPage /> } />
                        <Route path='*' element={ <NotFoundPage /> } />
                    </Routes>
                </Suspense>
            </main>
            <InfobarComp />
        </>
    );
}

export default App;
