import { FC, ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { mapUserScore, UserScore } from "@/shared/models/score.model";
import TableComp from "@/ui/components/common/table.component";
import "@/ui/pages/code/code.page.css";
import { getUserAll } from "@/api/user.api";
import { getScoreByUserId } from "@/api/score.api";
import { useGeneralVars } from "@/shared/contexts/common/general.context";
import { useSmartRef } from "@/shared/utils/common/hook.util";
import { getProblemAll } from "@/api/problem.api";

const USERS = await getUserAll();
const PROBLEMS = await getProblemAll();

const CodePage: FC = (): ReactNode => {
    const { user } = useGeneralVars();
    const score_ref = useSmartRef([].map(mapUserScore));

    function displayRowUser(score: UserScore, index: number): ReactNode {
        return (
            <tr key={index}>
                <td>{(USERS.find((value) => { return value.id === score.user_id; }))?.pseudo}</td>
                <td>{score.total}</td>
                {...score.points.map((val, idx) => { return <td key={idx}>{val}</td>; })}
            </tr>
        );
    }

    useEffect(() => {
        console.log("Loaded: CodePage");

        getScoreByUserId(user.current.id)
            .then((value) => { score_ref.current = [value].map(mapUserScore); })
            .catch(alert);
    }, []);

    useEffect(() => {
        console.log("Rendered: CodePage");
    });

    return (
        <TableComp<UserScore>
            elements={score_ref}
            default_sorting_field={'total'}
            heads={[
                { key: 'user_id', item: <></> },
                { key: 'total', item: <p>Total Points</p> },
                ...
                    PROBLEMS
                    .sort((a, b) => { return a.id - b.id; })
                    .map((value) => {
                        return {
                            item: (
                                <Link to={`/problem/${value.id.toString()}`} style={{ background: value.color, color: 'black', padding: '10px', borderRadius: '5px' }}>
                                    {value.letter}
                                </Link>
                            ),
                        };
                    }),
            ]}
            displayRowElement={displayRowUser}
        />
    );
}

export default CodePage;
