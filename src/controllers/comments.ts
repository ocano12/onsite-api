import { Comment } from '@models';
import { dbInsert } from '@database';

//TODO: should i just return the ID? I think so
export const insertComments = async (comment: string, userID: number) => {
    console.log(userID);
    try {
        const result: Comment = await dbInsert({ tableName: 'comments', columns: ['comment', 'created_by', 'modified_by'], values: [comment, userID, userID] });

        return result.id;
    } catch (e) {
        console.log(e);
        throw e;
    }
};
