interface User {
  userId: string;
  username: string;
  password: string;
  avatar: string;
  role?: string;
  tag?: string;
  createTime: number;
}
// 问号表示属性是可选的，可以有也可以没有