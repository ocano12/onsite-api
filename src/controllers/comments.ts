import { Comment } from '@models';
import { dbInsert } from '@database';

//TODO: should i just return the ID? I think so
export const insertComments = async (comment: string, createdBy: number): Promise<Comment['id']> => {
    try {
        const result: Comment = await dbInsert({ tableName: 'comments', columns: ['comment, created_by'], values: [comment, createdBy] });

        return result.id;
    } catch (e) {
        console.log(e);
        throw new Error(`Could not inser comment reason = ${e}`);
    }
};
