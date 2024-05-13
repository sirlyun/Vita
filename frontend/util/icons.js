const getIconPath = (name) => {
  return `/icons/${name}-icon.png`;
};

const icons = {
  option: "/icons/option-icon.png",
  daily: "/icons/daily-icon.png",
  hospital: "/icons/hospital-icon.png",
  report: "/icons/report-icon.png",
  single: "/icons/single-icon.png",
  pvp: "/icons/pvp-icon.png",
  shop: "/icons/shop-icon.png",
  running: "/icons/running-icon.png",
  gym: "/icons/gym-icon.png",
  cancel: "/icons/cancel.png",
  home: "/icons/home-icon.png",
  kcal: "/icons/kcal-icon.png",
  salt: "/icons/salt-icon.png",
  sugar: "/icons/sugar-icon.png",
  fat: "/icons/fat-icon.png",
  protein: "/icons/protein-icon.png",
  prev: "/icons/prev-icon.png",
  "cigarette-one": "/icons/cigarette-one-icon.png",
  "cigarette-two": "/icons/cigarette-two-icon.png",
  "cigarette-box": "/icons/cigarette-box.png",
  heated: "/icons/heated-icon.png",
  liquid: "/icons/liquid-icon.png",
  liquor: "/icons/liquor-icon.png",
  beer: "/icons/beer-icon.png",
  x: "/icons/x-icon.png",
  soju: "/icons/soju-icon.png",
  "soju-two": "/icons/soju-two.png",
  "soju-three": "/icons/soju-three.png",
  heart: "/icons/heart-icon.png",
  diabetes: "/icons/diabetes-icon.png",
  hypertension: "/icons/hypertension-icon.png",
  pnewmonia: "/icons/pnewmonia-icon.png",
  stroke: "/icons/stroke-icon.png",
  male: "/icons/male-icon.png",
  female: "/icons/female-icon.png",
  "google-logo": "/icons/google-logo-icon.png",
};

const debuffIcons = [
  { name: "alcohol", ref: "/icons/debuff-alcohol-icon.png" },
  { name: "cigarette", ref: "/icons/debuff-cigarette-icon.png" },
  { name: "food", ref: "/icons/debuff-food-icon.png" },
  { name: "chronic", ref: "/icons/debuff-chronic-icon.png" },
];

export { icons, debuffIcons, getIconPath };
