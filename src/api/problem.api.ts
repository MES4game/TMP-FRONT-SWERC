
import { Example, mapExample, mapProblem, Problem } from "@/shared/models/problem.model";

const PROBLEMS = [
    { id: 1, letter: "A", color: "red", title: "Mamma Mia!", max_time: 1000, max_size: 32768, validation_points: 0, performance_points: 0, statement: "## Statement\n\nMario is in the kitchen, as usual, experimenting with his favorite ingredient: noodles. He has $N$ perfectly cooked noodles laid out on the counter.\n\nBeing the curious chef he is, Mario decides to play a little game. At each step, he grabs two free ends of noodles randomly and connects them.\n\nHe keeps going, connecting noodle ends two by two, until no free ends remain.\n\nWhile Mario loves to cook, he is also a mathematician at heart. He wonders: \"After all the noodles are connected, how many loops will I have on average?\"\n\nHelp Mario by calculating the average number of loops he will get.\n\n## Input\n\n- row $1$: an integer $N$\n\n## Output\n\nThe output should be a floating point number with 6 digits after the decimal point.\n\n## Constraints\n\n- test:\n\n  - $1 \\leq N < 10^3$\n\n- performance:\n\n  - $1 \\leq N < 10^7$" },
    { id: 2, letter: "B", color: "blue", title: "", max_time: 0, max_memory: 0, validation_points: 0, performance_points: 0, statement: "" },
    { id: 3, letter: "C", color: "cyan", title: "", max_time: 0, max_memory: 0, validation_points: 0, performance_points: 0, statement: "" },
    { id: 4, letter: "D", color: "yellow", title: "", max_time: 0, max_memory: 0, validation_points: 0, performance_points: 0, statement: "" },
    { id: 5, letter: "E", color: "orange", title: "", max_time: 0, max_memory: 0, validation_points: 0, performance_points: 0, statement: "" },
    { id: 6, letter: "F", color: "green", title: "", max_time: 0, max_memory: 0, validation_points: 0, performance_points: 0, statement: "" },
];

export async function getProblemAll(): Promise<Problem[]> {
    return PROBLEMS.map(mapProblem);
}

export async function getProblemById(id: number): Promise<Problem> {
    return mapProblem(PROBLEMS.find((value) => { return value.id === id; }));
}

const EXAMPLES = [
    { name: "1_spaghetti", input: "1", output: "1.000000", comment: "With a single spaghetto, you can join both ends of the spaghetto and have a single loop." },
    { name: "2_bucatini", input: "3", output: "1.533333", comment: "" },
    { name: "3_capellini", input: "10", output: "2.133256", comment: "" },
];

export async function getExampleByProblemId(_id: number): Promise<Example[]> {
    return EXAMPLES.map(mapExample);
}
