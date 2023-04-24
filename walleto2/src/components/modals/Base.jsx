import React, { useState } from "react";
import NavigationBar from "./NavigationBar";

function Base({ handleUserInfo, userDetails }) {
  return (
    <>
      <NavigationBar
        handleUserInfo={handleUserInfo}
        userDetails={userDetails}
      />
    </>
  );
}

export default Base;
