import React from "react";
import Image from "next/image";
function LogoGroupSection() {
  return (
    <div className="w-full flex justify-center">
      <Image
        src="/images_landingpage6/logo-group.png"
        alt="logo group"
        width={200}
        height={500}
        style={{ width: "auto", height: "auto" }}
      />
    </div>
  );
}

export default LogoGroupSection;
