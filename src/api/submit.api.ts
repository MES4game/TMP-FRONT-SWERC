import { mapSubmit, Submit } from "@/shared/models/submit.model";
import { getRandomNumber } from "@/shared/utils/common/random.util";
import { fetchGet, fetchPost } from "./common.api";

const SUBMITS = Array.from({ length: 100 }, (_, idx) => { return { id: idx, user_id: getRandomNumber(1, 5), problem_id: getRandomNumber(1, 6), status_id: getRandomNumber(1, 4), points: getRandomNumber(0, 128), posted_on: new Date(getRandomNumber(1758412345123, 1758412345123 + 36000000)), finished_on: new Date(getRandomNumber(1758412345123, 1758412345123 + 36000000)) }; });

export async function getSubmitByProblemId(problem_id: number, user_id: number): Promise<Submit[]> {
    return SUBMITS.filter((value) => { return value.problem_id === problem_id && value.user_id === user_id; }).map(mapSubmit);
}

export async function postSubmit(token: string, problem_id: number, code: string) {
    await fetchPost("", "", {});
}

export async function downloadSubmit(token: string, submit_id: number): Promise<Response> {
    return await fetchGet("", "", {});
}
