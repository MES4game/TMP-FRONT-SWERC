import { FC, ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { fetchGet, fetchPost } from "@/api/common.api";
import { useGeneralVars } from "@/shared/contexts/common/general.context";
import { unknownToString } from "@/shared/utils/common/convert.util";
import { mapExample, mapProblem } from "@/shared/models/problem.model";
import { getExampleByProblemId, getProblemById } from "@/api/problem.api";
import { mapSubmit } from "@/shared/models/submit.model";
import { getSubmitByProblemId } from "@/api/submit.api";
import "katex/dist/katex.min.css";
import "@/ui/pages/code/problem/problem.page.css";

const ProblemPage: FC = (): ReactNode => {
    const { token, user } = useGeneralVars();
    const { id } = useParams<{ id: string }>();
    const [problem, setProblem] = useState(mapProblem({}));
    const [examples, setExamples] = useState([].map(mapExample));
    const [submits, setSubmits] = useState([].map(mapSubmit));
    const [download_response, setDownloadResponse] = useState<Response | undefined>(undefined);

    function handleSubmit() {
        alert('Submit sent');
        const code = (document.getElementById('code') as HTMLTextAreaElement).value;
        fetchPost(token.current, `/submit/post/${id?.toString() ?? ""}`, { code: JSON.stringify(code) })
            .catch((error: unknown) => { alert(`Submit failed: ${unknownToString(error)}`) });
    }

    function handleDownload(submit_id: number) {
        alert(`Downloading submit ${submit_id.toString()}...`);
        void fetchGet(token.current, `/submit/getById/${submit_id.toString()}`, {})
            .then(setDownloadResponse)
            .catch((error: unknown) => { alert(`Download failed : ${unknownToString(error)}`) });
    }

    useEffect(() => {
        if (!download_response?.ok) return;

        void (async () => {
            const blob = await download_response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "code.py";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        })();
    }, [download_response]);

    useEffect(() => {
        console.log("Loaded: ProblemPage");

        getProblemById(Number(id))
            .then(setProblem)
            .catch(alert);

        getExampleByProblemId(Number(id))
            .then(setExamples)
            .catch(alert);

        getSubmitByProblemId(Number(id), user.current.id)
            .then(setSubmits)
            .catch(alert);
    }, []);

    useEffect(() => {
        console.log("Rendered: ProblemPage");
    });

    return (
        problem
        ? (
            <div className="max-w-2xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">
                    {problem.letter}. {problem.title}
                </h1>
                <hr />
                <div className="prose prose-lg max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                    >
                        {problem.statement}
                    </ReactMarkdown>
                </div>
                <hr />
                <p>Max time: {problem.max_time} millisecond(s)</p>
                <p>Max size: {problem.max_memory} kibibyte(s)</p>
                <hr />
                {
                    ...examples.map((value) => {
                        return (
                            <div>
                                <p>Example: {value.name}</p>
                                <p>
                                    Input:
                                    <ReactMarkdown>{value.input}</ReactMarkdown>
                                </p>
                                <p>
                                    Output:
                                    <ReactMarkdown>{value.output}</ReactMarkdown>
                                </p>
                                <p>
                                    Comment:
                                    <ReactMarkdown>{value.comment}</ReactMarkdown>
                                </p>
                            </div>
                        );
                    })
                }
                <hr />
                <section className='submit'>
                    <div className='submit-container'>
                        <label htmlFor='code'>Code</label>
                        <textarea id='code' name='code' rows={10} cols={50}></textarea>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                    <div className='submit-history'>
                        <h2>Submits</h2>
                        {
                            ...submits.map((value, index) => {
                                return (
                                    <div key={index}>
                                        <p>Time : {value.posted_on.toUTCString()}</p>
                                        <p>Status : {value.status_id}</p>
                                        <p>Score : {value.points}</p>
                                        <button onClick={() => { handleDownload(value.id) }}>Download Code</button>
                                    </div>
                                );
                            })
                        }
                    </div>
                </section>
            </div>
        )
        : <h2>Problem not found</h2>
    );
}

export default ProblemPage;
