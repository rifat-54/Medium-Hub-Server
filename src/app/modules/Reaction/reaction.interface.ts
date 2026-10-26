import type { ReactionType } from "../../../../generated/prisma/enums";

export interface ICreateReactionPayload {
    blogId: string;
    type: ReactionType;
}


