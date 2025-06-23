import generateDemo from "./templates/demo";

const tasks = [generateDemo];

for (const task of tasks) {
  task();
}
