import Image from "next/image";

interface ShowImageProps {
  foodImage: string;
  selectFile: () => void;
}

const ShowImage = ({ foodImage, selectFile }: ShowImageProps) => (
  <div>
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
