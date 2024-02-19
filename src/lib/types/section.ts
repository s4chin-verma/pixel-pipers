export type NavLinkType = {
  name: string;
  url: string;
};

export type User = {
  _id: string;
  first_name: string;
  last_name: string;
  username: string;
  picture: string;
  email: string;
};

export type RegisterValue = {
  _id: string;
  id: string;
  icon: string;
  name: string;
  type: string;
  label: string;
};

export type Token = {
  refresh: string;
  access: string;
};

export type MlModels = {
  _id: string;
  name: string;
  description: string;
  price: string;
};

export type DemoResponse = {
  image_path: string;
  confidence_threshold: string;
};

export type DemoRequest = {
  count: string;
  image_url: string;
};

