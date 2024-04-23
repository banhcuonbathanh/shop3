import { X } from "lucide-react";
import React, { useCallback } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
interface FileDropzoneProps {
  acceptedFiles: File[];
  onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => void;
  onRemove: (index: number) => void;
}

const ImageUploadZoneProduct: React.FC<FileDropzoneProps> = ({
  acceptedFiles,
  onDrop,
  onRemove
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop
  });

  const handleRemove = (index: number) => {
    onRemove(index);
  };

  return (
    <div>
      <div className="relative flex flex-wrap gap-4 mb-4">
        {acceptedFiles.map((file, index) => (
          <div key={file.name}>
            <div className="relative rounded-md overflow-hidden">
              <div className="absolute z-10 right-0 top-0">
                <IconButton
                  onClick={() => handleRemove(index)}
                  icon={<X size={11} />}
                />
              </div>
              <Image
                src={URL.createObjectURL(file)}
                width={150}
                height={150}
                alt={file.name}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        {...getRootProps()}
        className="border-dashed border-2 border-gray-300 p-4"
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </div>
  );
};

export default ImageUploadZoneProduct;
