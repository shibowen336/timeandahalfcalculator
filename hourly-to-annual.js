// Hourly to Annual Salary Converter

const $ = (id) => document.getElementById(id);

const fmt = (n) =>
  "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

function calculate() {
  const rate = parseFloat($("hourlyRate").value) || 0;
  const hoursWk = parseFloat($("hoursPerWeek").value) || 0;
  const weeksYr = parseFloat($("weeksPerYear").value) || 0;
  const otHrsWk = parseFloat($("otHoursPerWeek").value) || 0;
  const otMult = parseFloat($("otMultiplier").value) || 1.5;

  const regularWeekly = rate * hoursWk;
  const overtimeWeekly = rate * otMult * otHrsWk;
  const grossWeekly = regularWeekly + overtimeWeekly;

  const annual = grossWeekly * weeksYr;
  const biweekly = annual / 26;
  const semiMonthly = annual / 24;
  const monthly = annual / 12;
  const daily = rate * 8 + rate * otMult * (otHrsWk / 5);

  $("rHourly").textContent = fmt(rate);
  $("dHourly").textContent = `Base rate`;

  $("rDaily").textContent = fmt(rate * 8);
  $("dDaily").textContent = `${rate}/hr × 8 hrs (regular day, no OT)`;

  $("rWeekly").textContent = fmt(grossWeekly);
  $("dWeekly").textContent =
    otHrsWk > 0
      ? `${hoursWk} reg + ${otHrsWk} OT at ${otMult}x`
      : `${hoursWk} hrs × ${fmt(rate)}/hr`;

  $("rBiweekly").textContent = fmt(biweekly);
  $("dBiweekly").textContent = `Annual ÷ 26 paychecks`;

  $("rSemi").textContent = fmt(semiMonthly);
  $("dSemi").textContent = `Annual ÷ 24 paychecks`;

  $("rMonthly").textContent = fmt(monthly);
  $("dMonthly").textContent = `Annual ÷ 12 months`;

  $("rAnnual").textContent = fmt(annual);
  $("dAnnual").textContent =
    otHrsWk > 0
      ? `${weeksYr} weeks/year, including ${otHrsWk * weeksYr} OT hours`
      : `${weeksYr} weeks/year × ${fmt(grossWeekly)}/week`;
}

function reset() {
  $("hourlyRate").value = "25";
  $("hoursPerWeek").value = "40";
  $("weeksPerYear").value = "52";
  $("otHoursPerWeek").value = "0";
  $("otMultiplier").value = "1.5";
  calculate();
}

document.addEventListener("DOMContentLoaded", () => {
  $("calculateBtn").addEventListener("click", calculate);
  $("resetBtn").addEventListener("click", reset);

  ["hourlyRate", "hoursPerWeek", "weeksPerYear", "otHoursPerWeek", "otMultiplier"].forEach((id) => {
    $(id).addEventListener("input", calculate);
    $(id).addEventListener("change", calculate);
  });

  calculate();
});
