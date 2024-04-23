import React, { useState } from "react";
import { Textarea } from "@nextui-org/react";
import { Button } from "@/components/ui/button";

interface TextareaProps {
  onChange: (valuefromtextarea: string) => void;
  labeltextarea: string;
  description: string;
}

export const InputText: React.FC<TextareaProps> = ({
  onChange,
  labeltextarea,
  description
}) => {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col py-6 m-3 ">
      <Textarea
        className="border  "
        variant="underlined"
        // label={labeltextarea}
        // labelPlacement="outside"
        placeholder={description}
        value={value}
        onValueChange={setValue}
      />
      <p className="text-default-500 text-small">Textarea value: {value}</p>

      <button className="py-2 px-4 my-2 border border-width: 1px w-100">
        Add Title to Blog
      </button>
    </div>
  );
};

{
  /* <input
        type="text"
        placeholder="Title"
        className="px-2 py-2 my-5 text-xl rounded-md shadow-sm border"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          onTitleChange(e.target.value);
        }}
      /> */
}
