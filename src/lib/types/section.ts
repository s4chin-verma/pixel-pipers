export type NavLinkType = {
  name: string;
  url: string;
};

export type Message = {
  authorId: string;
  msg: string;
};

export type User = {
  _id: string;
  username: string;
  picture: string;
};

export type RegisterValue = {
  _id: string;
  id: string;
  icon: string;
  name: string;
  type: string;
  label: string;
};
