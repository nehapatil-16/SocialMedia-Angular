// friend-request.model.ts

export interface FriendRequest {
    id: number;
    from_user: number;
    to_user: number;
    is_accepted: string;
  }
  