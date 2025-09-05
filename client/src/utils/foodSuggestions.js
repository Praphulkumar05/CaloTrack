const foodSuggestions = [
  {
    min: 1500,
    max: 1800,
    items: [
      "2 boiled eggs + 2 slices whole grain toast",
      "1 bowl mixed salad with grilled chicken",
      "1 cup oatmeal with nuts and banana",
      "1 glass of milk + 1 apple",
    ],
  },
  {
    min: 1801,
    max: 2200,
    items: [
      "Grilled fish + brown rice + steamed veggies",
      "1 bowl dal + 2 chapatis + salad",
      "Smoothie with banana, peanut butter, oats",
      "2 boiled eggs + 1 sandwich",
    ],
  },
  {
    min: 2201,
    max: 2800,
    items: [
      "Paneer wrap + fruit juice",
      "Chicken breast + quinoa + veggies",
      "Whole grain pasta with pesto & grilled vegetables",
      "Boiled potatoes + curd + 1 fruit",
    ],
  },
  {
    min: 2801,
    max: 3500,
    items: [
      "4 egg omelette + avocado toast + nuts",
      "Beef or tofu bowl + whole wheat couscous",
      "2 protein shakes + peanut butter sandwich",
      "Paneer tikka + rice + dal + roti",
    ],
  },
];

export default function getFoodSuggestions(calories) {
  for (let range of foodSuggestions) {
    if (calories >= range.min && calories <= range.max) {
      return range.items;
    }
  }
  return ["Stay hydrated and eat balanced meals."];
}
