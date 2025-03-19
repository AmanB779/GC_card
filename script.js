// WhatsApp popup functionality
const joinButton = document.getElementById("join-whatsapp");
const popupOverlay = document.getElementById("whatsapp-popup");
const popupClose = document.querySelector(".popup-close");
const whatsappForm = document.getElementById("whatsapp-form");

joinButton.addEventListener("click", (e) => {
  e.preventDefault();
  popupOverlay.classList.add("active");
  joinButton.style.transform = "scale(0.95)";
  setTimeout(() => {
    joinButton.style.transform = "";
  }, 200);
  document.getElementById("joining-date").min = "2025-04-01";
});

popupClose.addEventListener("click", () => {
  popupOverlay.classList.remove("active");
  whatsappForm.reset();
});

popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.classList.remove("active");
    whatsappForm.reset();
  }
});

// Auto-select all subjects when a class is chosen
document.getElementById("class").addEventListener("change", function () {
  const subjectCheckboxes = document.querySelectorAll('input[name="subjects"]');
  subjectCheckboxes.forEach((checkbox) => {
    checkbox.checked = true;
  });
});

whatsappForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const classValue = document.getElementById("class").options[document.getElementById("class").selectedIndex].text;
  const joiningDate = document.getElementById("joining-date").value;

  // Basic form validation (email removed)
  if (!name || !mobile || !classValue || !joiningDate) {
    alert("Please fill all required fields");
    return;
  }

  // Mobile number validation
  const mobileRegex = /^[0-9]{10}$/;
  if (!mobileRegex.test(mobile.replace(/\D/g, ""))) {
    alert("Please enter a valid 10-digit mobile number");
    return;
  }

  // Get selected subjects
  const subjectCheckboxes = document.querySelectorAll('input[name="subjects"]:checked');
  if (subjectCheckboxes.length === 0) {
    alert("Please select at least one subject");
    return;
  }
  const subjects = Array.from(subjectCheckboxes)
    .map((cb) => cb.value)
    .join(", ");

  // Prepare WhatsApp message (email removed)
  const message = `*GC Institute Registration*
--------------------------
*Name:* ${name}
*Mobile:* ${mobile}
*Class:* ${classValue}
*Subjects:* ${subjects}
*Joining Date:* ${joiningDate}
--------------------------
_I'm interested in joining your classes. Please add me to the WhatsApp group._`;

  const encodedMessage = encodeURIComponent(message);
  // Send message to specific number 9540945464
  const whatsappURL = `https://wa.me/9540945464/?text=${encodedMessage}`;

  // Create confetti effect
  createConfetti();

  const successMessage = document.createElement("div");
  successMessage.className = "success-message";
  successMessage.innerHTML = `
    <div class="flex items-center justify-center mb-4">
      <i class="fas fa-check-circle text-green-500 text-4xl"></i>
    </div>
    <h3 class="text-lg font-bold text-center">Registration Successful!</h3>
    <p class="text-center mt-2">Redirecting you to WhatsApp...</p>
  `;

  const formContent = document.querySelector(".popup-body");
  formContent.innerHTML = "";
  formContent.appendChild(successMessage);

  setTimeout(() => {
    window.open(whatsappURL, "_blank");
    setTimeout(() => {
      popupOverlay.classList.remove("active");
      formContent.innerHTML = "";
      formContent.appendChild(whatsappForm);
      whatsappForm.reset();
    }, 500);
  }, 2000);
});

function createConfetti() {
  const confettiCount = 100;
  const colors = ["#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.width = `${Math.random() * 10 + 5}px`;
    confetti.style.height = confetti.style.width;
    confetti.style.opacity = Math.random();
    confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s ease forwards`;
    document.body.appendChild(confetti);
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

const card = document.querySelector(".invitation-card");
const cardHeader = document.querySelector(".card-header");
const logo = document.querySelector(".logo");
const invitationTitle = document.querySelector(".invitation-title");

card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = (y - centerY) / 30;
  const rotateY = (centerX - x) / 30;
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  const moveX = (centerX - x) / 10;
  const moveY = (centerY - y) / 10;
  logo.style.transform = `translateX(${moveX * 0.5}px) translateY(${moveY * 0.5}px)`;
  invitationTitle.style.transform = `translateX(${moveX * 0.7}px) translateY(${moveY * 0.7}px)`;
  cardHeader.style.backgroundPosition = `${50 + moveX * 0.05}% ${50 + moveY * 0.05}%`;
});

card.addEventListener("mouseleave", () => {
  card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  logo.style.transform = "translateX(0) translateY(0)";
  invitationTitle.style.transform = "translateX(0) translateY(0)";
  cardHeader.style.backgroundPosition = "50% 50%";
});
