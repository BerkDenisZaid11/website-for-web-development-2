// Go to payment page
function goToPay() {
  window.location.href = "pay.html";
}

// Form validation + API
const form = document.getElementById("paymentForm");

if (form) {
  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const card = document.getElementById("cardNumber").value;
    const month = document.getElementById("expMonth").value;
    const year = document.getElementById("expYear").value;
    const cvv = document.getElementById("cvv").value;

    // Regex validation
    const cardRegex = /^5[1-5][0-9]{14}$/;
    const cvvRegex = /^[0-9]{3,4}$/;

    if (!cardRegex.test(card)) {
      alert("Invalid MasterCard number");
      return;
    }

    if (!cvvRegex.test(cvv)) {
      alert("Invalid CVV");
      return;
    }

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    if (year < currentYear || (year == currentYear && month < currentMonth)) {
      alert("Card expired");
      return;
    }

    // Save last 4 digits
    sessionStorage.setItem("last4", card.slice(-4));

    try {
      const response = await fetch("https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          master_card: Number(card),
          exp_year: Number(year),
          exp_month: Number(month),
          cvv_code: cvv
        })
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = "success.html";
      } else {
        document.getElementById("message").innerText = data.message;
      }

    } catch (error) {
      document.getElementById("message").innerText = "Server error";
    }
  });
}
sessionStorage.setItem("last4", card.slice(-4));