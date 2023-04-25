import React, { useState } from "react";
import { NavBarProps } from "../../pages/type/NavbarProp";
import NavigationBar from "./NavigationBar";

function Base({ handleUserInfo, userDetails }: NavBarProps) {
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
