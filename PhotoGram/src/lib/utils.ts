import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function navgationCheck(path:string,itemPath:string):boolean{
    const pathElement = path.split("/")[1];
    if(pathElement === itemPath.slice(1,)){
      return true;
    }
    return false;
}