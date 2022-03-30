import React from "react";
import { CoursePart } from "../types";
import { Part } from "./part";

export interface ContentProps {
  parts: CoursePart[];
}

export const Content: React.FC<ContentProps> = ({parts}: ContentProps) => {
  return (
    <div>
    {parts.map(part => {
      return <Part key={part.name} part={part}></Part>}
    )}
    </div>
  )
}