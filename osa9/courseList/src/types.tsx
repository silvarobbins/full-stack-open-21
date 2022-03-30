export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface Description extends CoursePartBase {
  description: string;
}

export interface CourseNormalPart extends Description {
  type: "normal";
  
}

export interface CourseSubmissionPart extends Description {
  type: "submission";
  exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends Description{
  name: string;
  exerciseCount: number;
  requirements: string[];
  type: "special";
}


export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;