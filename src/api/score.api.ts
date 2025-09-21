import { mapUserScore, UserScore } from "@/shared/models/score.model";
import { getRandomNumber } from "@/shared/utils/common/random.util";

const NAMES = ["Maxime", "Simon", "CIA", "NoFront", "NoBack"];
const USERSSCORES = Array.from(
    { length: 5 },
    (_, idx) => {
        return {
            id: idx,
            pseudo: NAMES[idx],
            total: 0,
            points: Array.from({ length: 6 }, () => { return getRandomNumber(0, 128); }),
        };
    },
);
USERSSCORES.forEach((value) => { value.total = value.points.reduce((acc, curr) => { return acc + curr; }, 0); })

export async function getScoreboard(): Promise<UserScore[]> {
    return USERSSCORES.map(mapUserScore);
}

export async function getScoreByUserId(id: number): Promise<UserScore> {
    return mapUserScore(USERSSCORES.filter((value) => { return value.id === id; }));
}
