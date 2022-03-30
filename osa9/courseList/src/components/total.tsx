import React from "react";
import { CoursePart } from "../types";

export interface TotalProps {
  parts: CoursePart[];
}

export const Total: React.FC<TotalProps> = ({parts}: TotalProps) => {
  return (
    <div>
        Number of exercises{" "}
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  )
}