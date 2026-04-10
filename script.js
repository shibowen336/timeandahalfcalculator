// Time and a Half Calculator Logic

const $ = (id) => document.getElementById(id);

const fmt = (n) =>
  "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

function calculate() {
  const rate = parseFloat($("hourlyRate").value) || 0;
  const regHours = parseFloat($("regularHours").value) || 0;
  const otHours = parseFloat($("overtimeHours").value) || 0;
  const dtHours = parseFloat($("doubleHours").value) || 0;
  const holHours = parseFloat($("holidayHours").value) || 0;
  const holMult = parseFloat($("holidayMultiplier").value) || 1;

  const regularPay = rate * regHours;
  const overtimePay = rate * 1.5 * otHours;
  const doublePay = rate * 2 * dtHours;
  const holidayPay = rate * holMult * holHours;
  const totalPay = regularPay + overtimePay + doublePay + holidayPay;
  const totalHours = regHours + otHours + dtHours + holHours;

  $("regularPay").textContent = fmt(regularPay);
  $("regularDetail").textContent =
    regHours > 0
      ? `${regHours} hrs × ${fmt(rate)}/hr`
      : "—";

  $("overtimePay").textContent = fmt(overtimePay);
  $("overtimeDetail").textContent =
    otHours > 0
      ? `${otHours} hrs × ${fmt(rate * 1.5)}/hr (1.5x)`
      : "—";

  $("doublePay").textContent = fmt(doublePay);
  $("doubleDetail").textContent =
    dtHours > 0
      ? `${dtHours} hrs × ${fmt(rate * 2)}/hr (2x)`
      : "—";

  $("holidayPay").textContent = fmt(holidayPay);
  $("holidayDetail").textContent =
    holHours > 0
      ? `${holHours} hrs × ${fmt(rate * holMult)}/hr (${holMult}x)`
      : "—";

  $("totalPay").textContent = fmt(totalPay);
  $("totalDetail").textContent =
    totalHours > 0
      ? `${totalHours} total hours worked`
      : "—";
}

function reset() {
  $("hourlyRate").value = "";
  $("regularHours").value = "";
  $("overtimeHours").value = "";
  $("doubleHours").value = "";
  $("holidayHours").value = "";
  $("holidayMultiplier").value = "2";
  calculate();
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  $("calculateBtn").addEventListener("click", calculate);
  $("resetBtn").addEventListener("click", reset);

  // Live calculation on input change
  ["hourlyRate", "regularHours", "overtimeHours", "doubleHours", "holidayHours", "holidayMultiplier"].forEach((id) => {
    $(id).addEventListener("input", calculate);
    $(id).addEventListener("change", calculate);
  });

  // Initial calculation
  calculate();
});
