export interface Content {
    type: string;
    data: string;
    _id: string;
}
  
export type Post = {
    _id: string;
    username: string;
    content: Content[];
};