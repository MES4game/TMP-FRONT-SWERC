import { FC, ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSmartRef } from "@/shared/utils/common/hook.util";
import { useGeneralVars } from "@/shared/contexts/common/general.context";
import { mapUserScore, UserScore } from "@/shared/models/score.model";
import { getProblemAll } from "@/api/problem.api";
import { getScoreByUserId } from "@/api/score.api";
import TableComp from "@/ui/components/common/table.component";
import "@/ui/pages/code/code.page.css";
import { Problem } from "@/shared/models/problem.model";

const CodePage: FC = (): ReactNode => {
    const { user } = useGeneralVars();
    const score_ref = useSmartRef<UserScore[]>([]);
    const [problems, setProblems] = useState<Problem[]>([]);

    function displayRowUser(score: UserScore, index: number): ReactNode {
        console.log(score);
        return (
            <tr key={index}>
                <td>{score.pseudo}</td>
                <td>{score.total}</td>
                {...score.points.map((val, idx) => { return <td key={idx}>{val}</td>; })}
            </tr>
        );
    }

    useEffect(() => {
        console.log("Loaded: CodePage");

        getProblemAll()
            .then(setProblems)
            .catch(alert);

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
                ...problems
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
