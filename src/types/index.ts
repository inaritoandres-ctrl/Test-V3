export interface CoupleInfo {
  brideName: string;
  groomName: string;
  latinNames: string;
  heroPhoto: string;
  dateBadge: string;
  sparkleQuote: string;
  invitationVerse: string;
  story?: string;
}

export interface WeddingDetails {
  dateSolar: string;
  dateGregorian: string;
  time: string;
  dayOfWeek: string;
  countdownTarget: string; // ISO date string
}

export interface TimelineItem {
  id: string;
  time: string;
  title: string;
  description: string;
  iconType: 'drink' | 'heart' | 'camera' | 'music' | 'dinner';
}

export interface ColorPaletteItem {
  name: string;
  color: string;
  textColor?: string;
}

export interface DressCode {
  title: string;
  subtitle: string;
  palette: ColorPaletteItem[];
  notes: string[];
}

export interface LocationInfo {
  venueName: string;
  hallName: string;
  city: string;
  address: string;
  parkingInfo: string;
  googleMapsUrl: string;
  wazeUrl: string;
  neshanUrl: string;
  baladUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface GalleryItem {
  id: string;
  src: string;
  caption: string;
  span?: 'single' | 'wide' | 'tall';
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  date: string;
}

export interface MusicConfig {
  title: string;
  artist: string;
  src: string;
  autoPlayOnOpen: boolean;
}

export interface EnvelopeConfig {
  videoSrc: string;
  helperText?: string;
  ariaLabel?: string;
}

export interface ShareConfig {
  title: string;
  text: string;
}

export interface FooterConfig {
  signature?: string;
  wishesText?: string;
  badgeText?: string;
}

export interface RsvpConfig {
  notePlaceholder?: string;
}

export interface GuestbookConfig {
  messagePlaceholder?: string;
}

export interface ModuleItemConfig {
  enabled: boolean;
  order?: number;
}

export interface ModulesConfig {
  hero?: ModuleItemConfig;
  timeline?: ModuleItemConfig;
  dressCode?: ModuleItemConfig;
  location?: ModuleItemConfig;
  gallery?: ModuleItemConfig;
  rsvp?: ModuleItemConfig;
  guestbook?: ModuleItemConfig;
}

export interface InvitationData {
  id?: string;
  envelope: EnvelopeConfig;
  couple: CoupleInfo;
  wedding: WeddingDetails;
  timeline: TimelineItem[];
  dressCode: DressCode;
  location: LocationInfo;
  gallery: GalleryItem[];
  guestbook: GuestbookEntry[];
  music: MusicConfig;
  modules?: ModulesConfig;
  share?: ShareConfig;
  footer?: FooterConfig;
  rsvp?: RsvpConfig;
  guestbookConfig?: GuestbookConfig;
}
