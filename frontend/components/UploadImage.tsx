import Image from "next/image";
import images from "@/util/images";

interface UploadImageProps {
  selectFile: () => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadImage = ({ selectFile, handleImageChange }: UploadImageProps) => (
  <div>
    <input
      type="file"
      hidden
      id="fileInput"
      onChange={handleImageChange}
      accept="image/png, image/jpeg"
    />
    <Image
      onClick={selectFile}
      src={images.camera} // 예제 이미지 경로
      width={100}
      height={100}
      alt="camera"
    />
  </div>
);

export default UploadImage;
