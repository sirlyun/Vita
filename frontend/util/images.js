export const getUserCharacterImagePath = (type, bodyShape, stance, number) => {
  return `/images/characters/${type}/${bodyShape}/${stance}${number}.png`;
};

export const getNPCCharacterImagePath = (name) => {
  return `/images/characters/npc/${name}.png`;
};

export const getShopImagePath = (name, type) => {
  if (type == "BACKGROUND") return `/images/backgrounds/${name}-bg.png`;

  return `/images/characters/emotions/${name}`;
};

const images = {
  stastitic_icon: "/icons/stastitic-icon.png",
  routine_icon: "/icons/routine-icon.png",
  dinner: "/images/clock-dinner.png",
  lunch: "/images/clock-lunch.png",
  breakfast: "/images/clock-breakfast.png",
  camera: "/images/camera.png",
  karina: "/images/karina.png",
  character1: "/images/characters/woman/avg/idle0.png",
  character2: "/images/characters/woman/fat/idle0.png",
  character3: "/images/characters/woman/skinny/walking1.png",
};

export default images;
