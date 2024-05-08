export const getImagePath = (key, gender, bodyShape, stance, number) => {
  if (key.includes('characters')) {
    return `/images/${key}/${gender}/${bodyShape}/${stance}${number}.png`;
  }
  return images[key];
};

const images = {
  stastitic_icon: '/icons/stastitic-icon.png',
  routine_icon: '/icons/routine-icon.png',
  dinner: '/images/clock-dinner.png',
  lunch: '/images/clock-lunch.png',
  breakfast: '/images/clock-breakfast.png',
  camera: '/images/camera.png',
  karina: '/images/karina.png',
  shopkeeper: '/images/characters/npc/shopkeeper.png',
  character1: '/images/characters/woman/avg/idle0.png',
  character2: '/images/characters/woman/fat/idle0.png',
  character3: '/images/characters/woman/skinny/walking1.png',
};

export default images;
