import React from "react";
import { CourseCard } from "./CourseCard";
 
export function Items({ currentItems, viewType }) {
  return (
    <>
      {currentItems?.length === 0 && <h1>No Courses Found.</h1>}
      {currentItems?.map((item) => (
        <CourseCard key={item.learningobject_id} course={item} viewType={viewType} />
      ))}
    </>
  );
}