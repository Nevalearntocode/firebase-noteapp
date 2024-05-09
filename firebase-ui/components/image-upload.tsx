"use client";

import React from "react";
import { Button } from "./ui/button";
import { ImagePlus, X } from "lucide-react";
import { Input } from "./ui/input";
import Image from "next/image";
import { onImageUpload } from "@/lib/utils";

type Props = {
  onChange: (image: File | undefined) => void;
  onRemove: () => void;
  value: File | string | undefined;
};

const ImageUpload = ({ onChange, value, onRemove }: Props) => {
  const inputImageRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      {value ? (
        <div className="relative">
          {typeof value === "string" ? (
            <Image
              priority={true}
              src={value}
              alt="Uploaded Image"
              width={200}
              height={200}
              className="h-36 w-auto rounded-md"
            />
          ) : (
            <Image
              priority={true}
              src={URL.createObjectURL(value)}
              alt="Uploaded Image"
              width={200}
              height={200}
              className="h-36 w-auto rounded-md"
            />
          )}
          <Button
            className="absolute -left-2 -top-2 m-0 h-6 w-6 rounded-full p-0"
            size={`icon`}
            variant={`destructive`}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onRemove();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <Button
            size={`icon`}
            variant={`secondary`}
            onClick={(e) => {
              e.preventDefault();
              inputImageRef.current?.click();
            }}
          >
            <ImagePlus className="h-4 w-4" />
          </Button>
          <Input
            type="file"
            ref={inputImageRef}
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                onChange(onImageUpload(e.target));
              }
            }}
            className="hidden"
          />
        </>
      )}
    </>
  );
};

export default ImageUpload;
