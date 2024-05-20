import Image from "next/image";

interface ShowImageProps {
  foodImage: string;
  selectFile: () => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ShowImage = ({
  foodImage,
  selectFile,
  handleImageChange,
}: ShowImageProps) => (
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
      src={foodImage}
      alt="foodImage"
      width={100}
      height={100}
      quality={100}
    />
  </div>
);

export default ShowImage;
