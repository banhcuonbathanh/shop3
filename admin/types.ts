export interface Product {
  id: number;
  category: Category;
  name: string;
  price: number; // Use 'number' for floating-point numbers
  isFeatured: boolean;
  size: Size;
  color: Color;
  imageUrls: string[];
  isArchived: boolean;
  createdAt: string;
  discount: number;
}

export interface Image {
  id: number;
  url: string;
}

export interface Billboard {
  id: number;
  label: string;
  imageUrl: string[];
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Size {
  id: number;
  name: string;
  value: string;
  createdAt: string;

  // Add more fields as needed
}

export interface Color {
  id: number;
  name: string;
  value: string;
  createdAt: string;
}

export interface OrderItem {
  UserID: number;
  ProductID: number;
  Total: number;
  Quantity: number;
  ID: number | null;
  Product: Product;

  OrderID: number;
  CreatedAt: string;
  DpdatedAt: string;
}
export interface Order {
  id: number;
  customerId: number;
  orderItems: OrderItem[];

  total: number;
  status: OrderStatus;
}

interface Address {
  name: string;
  streetAddress: string;
  email: string;
}

export enum OrderStatus {
  PENDING,
  PROCESSING,

  DELIVERED,
  CANCELED
}

export interface User {
  id: number;
  name?: string; // '?' indicates that the field is optional
  email: string;
  emailVerified?: string;
  image?: string;
  Password?: string;
  createdAt: string;
  updatedAt: string;
  favoriteIds: string[];
  phone_number: string;
  User_type: string;
  orders: Order[];
  accounts: Account[];
  sessions: Session[];
  Post: Post[];
  Comment: Comment[];
  streetAddress: string;
}

export interface Account {
  id: number;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;

  user: User;
}
// ------------------------------  blog -----------------------------

export interface AccountBlog {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
  user: User;
}

export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: string;
  user: User;
}

export interface UserBlog {
  id: string;
  name?: string | null;
  email: string;
  emailVerified?: string | null;
  image?: string | null;
  accounts: Account[];
  sessions: Session[];
  Post: Post[];
  Comment: Comment[];
}

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: string;
}

export interface CategoryBlog {
  id: string;
  slug: string;
  title: string;
  img?: string | null;
  Posts: Post[];
}

export interface Post {
  id: string;
  createdAt: string;
  slug: string;
  title: string;
  desc: string;
  img?: string | null;
  views: number;
  catSlug: string;
  cat: CategoryBlog;
  userEmail: string;
  user: UserBlog;
  comments: Comment[];
}

export interface Comment {
  id: string;
  createdAt: string;
  desc: string;
  userEmail: string;
  user: User;
  postSlug: string;
  post: Post;
}

export interface Token {
  type: string;
  userId: string;
}

export interface BlogCategory {
  ID: number; // Optional for new categories without an ID
  CreatedAt?: Date; // Optional timestamps if not using gorm.Model
  UpdatedAt?: Date; // Optional timestamps if not using gorm.Model
  Slug: string;
  Title: string;
  ImageUrl: string[]; // Array of strings for image URLs (instead of pq.StringArray)
  BlogPosts?: BlogPost[]; // Optional array of related BlogPosts (assuming BlogPost interface exists elsewhere)
  BlogPostID?: number; // Optional if not using foreign key relationship
}

export interface BlogPost {
  ID?: number; // Optional for new categories without an ID
  ImageUrl: string;
  Title: string;
  Desc: BlogSubDesGolang[];
  CategoryTitle: string;
  // Array of BlogSubDes objects
  BlogCatID: number;

  UserEmail: string;

  UserId: number;

  AthurEmail?: string;

  AthurName?: string;
  AthurImage?: string;
}
export interface BlogComment {
  id?: number; // Optional for new comments without an ID
  createdAt?: Date; // Optional timestamps if not using gorm.Model
  updatedAt?: Date; // Optional timestamps if not using gorm.Model
  desc: string;
  userEmail: string;
  postSlug?: string; // Optional for alternative reference to the post
  userID: number;
  BlogPostID: number;
  SourceType: string; // New field indicating comment source
  CategoryComment: string;

  userName: string;
}
export interface BlogSubDes {
  File: File;
  Title: string;
  Desc: string;
  ImageUrls: string;
}

export interface BlogSubDesGolang {
  BlogPostID: number;
  Title: string;
  Desc: string;
  ImageUrls: string;
}

// new
export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
  imageUrl: string[];
};

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: CategoryColumn;
  size: SizeColumn;
  color: ColorColumn;
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
  imageUrls: string[];
};
export type CategoryColumn = {
  id: string;
  name: string;
};

export type OrderColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  size: string;
  color: string;
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
  images: string[];
  items: OrderItem[];
};

export type SizeColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};
export type Message = {
  content: string;
  client_id: string;
  username: string;
  room_id: string;
  type: "recv" | "self";
};
