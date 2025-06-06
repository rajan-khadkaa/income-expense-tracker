const TestimonialInfo = [
  {
    name: "Mathilde Lewis",
    role: "Accountant, EastWeb",
    comment:
      "Love the simplicity of the service and the prompt customer support. We can’t imagine working without it.",
  },
  {
    name: "Anthony R.",
    role: "HR Manager, Esewa",
    comment:
      "The service is top-notch. I love how it keeps track of the expenses I do every month. Totally Outstanding.",
  },
  {
    name: "Jenny A.",
    role: "Quality Assurance, SwiftOne",
    comment:
      "Not only the service is great but also the user experience. I love how easy it is to track finance.",
  },
];

const featureCards = [
  {
    id: 1,
    iconName: "clipboard", // String identifier instead of <ClipboardIcon />
    title: "Track every transaction",
    description:
      "Log your income and expenses with ease, keeping everything organized in one place.",
  },
  {
    id: 2,
    iconName: "activity",
    title: "See where money goes",
    description:
      "Get a clear breakdown of your spending patterns making better financial decisions.",
  },
  {
    id: 3,
    iconName: "target",
    title: "Set monthly budgets",
    description:
      "Spendly helps you track your progress and avoid overspending so you can save more.",
  },
  {
    id: 4,
    iconName: "shield",
    title: "Simple & Secure",
    description:
      "Spendly is designed to keep your data safe, private, and accessible anytime you want.",
  },
];

const threeStepsData = {
  header: {
    title: "Start tracking in three simple steps",
    description:
      "Managing money shouldn’t be difficult. With Spendly, keeping track of your income and expenses is as quick and easy as 1-2-3.",
  },
  steps: [
    {
      title: "Add your records",
      description:
        "Record income and expenses in seconds. Simply enter the amount, choose a category, and let Spendly handle the rest.",
    },
    {
      title: "View transactions instantly",
      description:
        "Instantly see how much you've earned, spent, and saved. Visual breakdowns help you understand your financial habits.",
    },
    {
      title: "Get reports and insights",
      description:
        "Whether you're saving for something big or just want to cut down on unnecessary spending, Spendly keeps you on track.",
    },
  ],
  video: {
    src: "https://cdn.dribbble.com/userupload/16145904/file/original-175c0e53b179263691d318368a3cc264.mp4",
    alt: "Spendly app demo",
  },
};

export { featureCards, TestimonialInfo, threeStepsData };
// //or another way is
// export default [
//     //data
// ];

// import data from "./path"
