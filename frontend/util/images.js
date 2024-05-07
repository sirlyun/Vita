export const getImagePath = (key, gender, bodyShape, stance, number) => {
  if (key.includes('characters')) {
    return `/images/${key}/${gender}/${bodyShape}/${stance}${number}.png`;
  }
  return images[key];
};

const images = {
  camera: '/images/camera.png',
  breakfast: '/images/clock-breakfast.png',
  lunch: '/images/clock-lunch.png',
  dinner: '/images/clock-dinner.png',
  routine_icon: '/icons/routine-icon.png',
  stastitic_icon: '/icons/stastitic-icon.png',
};

export default images;
