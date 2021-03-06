/// <reference types="next" />
/// <reference types="next/types/global" />
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'


type Post = {
  id: string;
  date: string;
  title: string;
  content: string;
  htmlContent: string;
}
