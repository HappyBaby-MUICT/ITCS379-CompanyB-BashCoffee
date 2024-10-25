export interface LineEvent {
  type: string
  timestamp: number
  source: {
    type: 'user' | 'group' | 'room'
    userId?: string
    groupId?: string
    roomId?: string
  }
  replyToken?: string
}

export interface MessageEvent extends LineEvent {
  type: 'message'
  message: {
    id: string
    type: 'text' | 'image' | 'video' | 'audio' | 'file' | 'location' | 'sticker'
    text?: string
    fileName?: string
    fileSize?: number
    title?: string
    address?: string
    latitude?: number
    longitude?: number
    packageId?: string
    stickerId?: string
  }
}

export interface PostbackEvent extends LineEvent {
  type: 'postback'
  postback: {
    data: string
    params?: {
      date?: string
      time?: string
      datetime?: string
    }
  }
}

export interface FollowEvent extends LineEvent {
  type: 'follow'
}

export interface UnfollowEvent extends LineEvent {
  type: 'unfollow'
}

export interface JoinEvent extends LineEvent {
  type: 'join'
}

export interface LeaveEvent extends LineEvent {
  type: 'leave'
}

export interface BeaconEvent extends LineEvent {
  type: 'beacon'
  beacon: {
    hwid: string
    type: 'enter' | 'leave' | 'banner'
    dm?: string
  }
}

export interface MemberJoinedEvent extends LineEvent {
  type: 'memberJoined'
  joined: {
    members: Array<{
      userId: string
    }>
  }
}

export interface MemberLeftEvent extends LineEvent {
  type: 'memberLeft'
  left: {
    members: Array<{
      userId: string
    }>
  }
}

export type LineEventUnion =
  | MessageEvent
  | PostbackEvent
  | FollowEvent
  | UnfollowEvent
  | JoinEvent
  | LeaveEvent
  | BeaconEvent
  | MemberJoinedEvent
  | MemberLeftEvent
