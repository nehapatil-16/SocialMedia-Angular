export interface UserPost {
    id: number;
    user: number;  
    text: string;
    media: File | null; 
    date_of_post: Date;  
  }
  