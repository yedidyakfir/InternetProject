export class Book
{
  name: String = "";
  author: String = "";
  photo: String = "";
  seriesName: String = "";

  publishDate: Date = new Date();
  ISBN: Number = 0;
  summary: String = "";
  seller: String = "";
  buyer: String = "";

  sellDate: Date = new Date();

  createdAt: Date = new Date();

  updatedAt: Date = new Date();
  price: Number = 0;
  active: boolean = false;
}
