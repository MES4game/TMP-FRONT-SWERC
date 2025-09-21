import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { unknownToString } from "@/shared/utils/common/convert.util";
import { useGeneralVars } from "@/shared/contexts/common/general.context";
import { Submit } from "@/shared/models/submit.model";
import { Example, mapProblem } from "@/shared/models/problem.model";
import { getExampleByProblemId, getProblemById } from "@/api/problem.api";
import { downloadSubmit, getSubmitByProblemId, postSubmit } from "@/api/submit.api";
import "katex/dist/katex.min.css";
import "@/ui/pages/code/problem/problem.page.css";

const ProblemPage: FC = (): ReactNode => {
    const { token, user } = useGeneralVars();
    const { id } = useParams<{ id: string }>();
    const [problem, setProblem] = useState(mapProblem({}));
    const [examples, setExamples] = useState<Example[]>([]);
    const [submits, setSubmits] = useState<Submit[]>([]);
    const [download_response, setDownloadResponse] = useState<Response | undefined>(undefined);
    const code = useRef<HTMLTextAreaElement | null>(null);

    function handleSubmit() {
        alert('Sending submit...');
        postSubmit(token.current, Number(id), code.current?.value ?? "")
            .catch((error: unknown) => { alert(`Submit failed: ${unknownToString(error)}`) });
    }

    function handleDownload(submit_id: number) {
        alert(`Downloading submit ${submit_id.toString()}...`);
        downloadSubmit(token.current, submit_id)
            .then(setDownloadResponse)
            .catch((error: unknown) => { alert(`Download failed : ${unknownToString(error)}`) });
    }

    useEffect(() => {
        if (!download_response?.ok) return;

        download_response.blob()
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "code.py";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            })
            .catch(alert);
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
        problem.id > 0
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
                        <textarea ref={code} name='code' rows={10} cols={50}></textarea>
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
