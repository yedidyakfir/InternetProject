export class Blog
{
  name:string;
  description:string;
  creator:string;
  photo:string;
  users:string[] = [];
  posts:{msg: string, user:string}[] = [];
  likes:string[] = [];
  created_at:Date;
}