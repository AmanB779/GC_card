// Theme Toggle Functionality
const themeSwitch = document.getElementById("theme-switch");
const body = document.body;

// Check for saved theme preference
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-theme");
  themeSwitch.checked = true;
}

themeSwitch.addEventListener("change", function () {
  if (this.checked) {
    body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
    animateThemeSwitch("dark");
  } else {
    body.classList.remove("dark-theme");
    localStorage.setItem("theme", "light");
    animateThemeSwitch("light");
  }
});

function animateThemeSwitch(theme) {
  const animatedIcon = document.createElement("div");
  animatedIcon.className = `theme-transition-icon ${theme === "dark" ? "moon" : "sun"}`;
  animatedIcon.innerHTML = theme === "dark" ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  body.appendChild(animatedIcon);

  // Animate from one side to the other
  setTimeout(() => {
    animatedIcon.style.transform = "translateX(calc(100vw - 100px))";
    animatedIcon.style.opacity = "0";
  }, 50);

  setTimeout(() => {
    animatedIcon.remove();
  }, 1500);
}

// Card Flip Functionality
const card = document.querySelector(".invitation-card");
const cardInner = document.querySelector(".card-inner");
let touchStartTime = 0;
let touchTimer;

// Detect long press on mobile
card.addEventListener("touchstart", () => {
  touchStartTime = new Date().getTime();
  touchTimer = setTimeout(() => {
    cardInner.classList.toggle("flipped");
  }, 500); // 500ms longpress
});

card.addEventListener("touchend", () => {
  clearTimeout(touchTimer);
  // If it was a short tap on back of card, flip back to front
  if (new Date().getTime() - touchStartTime < 500 && cardInner.classList.contains("flipped")) {
    cardInner.classList.remove("flipped");
  }
});

// Also handle click on the flip info text
document.querySelectorAll(".flip-info").forEach((element) => {
  element.addEventListener("click", () => {
    cardInner.classList.toggle("flipped");
  });
});

// 3D Card Effect
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

  if (!cardInner.classList.contains("flipped")) {
    cardInner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Parallax effect for elements
    const moveX = (centerX - x) / 10;
    const moveY = (centerY - y) / 10;
    logo.style.transform = `translateX(${moveX * 0.5}px) translateY(${moveY * 0.5}px)`;
    invitationTitle.style.transform = `translateX(${moveX * 0.7}px) translateY(${moveY * 0.7}px)`;
    cardHeader.style.backgroundPosition = `${50 + moveX * 0.05}% ${50 + moveY * 0.05}%`;
  }
});

card.addEventListener("mouseleave", () => {
  cardInner.style.transform = cardInner.classList.contains("flipped") ? "perspective(1000px) rotateY(180deg)" : "perspective(1000px) rotateX(0) rotateY(0)";

  logo.style.transform = "translateX(0) translateY(0)";
  invitationTitle.style.transform = "translateX(0) translateY(0)";
  cardHeader.style.backgroundPosition = "50% 50%";
});

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
  clearErrors();
});

popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.classList.remove("active");
    whatsappForm.reset();
    clearErrors();
  }
});

// Subject data for different class categories
const subjectOptions = {
  "junior": [
    { id: "english", label: "English" },
    { id: "hindi", label: "Hindi" },
    { id: "maths", label: "Mathematics" },
    { id: "science", label: "Science" },
    { id: "social", label: "Social Studies" },
    { id: "computer", label: "Computer" },
    { id: "art", label: "Art & Craft" },
    { id: "music", label: "Music" },
  ],
  "senior": [
    { id: "english", label: "English" },
    { id: "hindi", label: "Hindi" },
    { id: "maths", label: "Mathematics" },
    { id: "science", label: "Science" },
    { id: "social", label: "Social Science" },
    { id: "cs-it", label: "CS/IT" },
  ],
  "11-science": [
    { id: "physics", label: "Physics" },
    { id: "chemistry", label: "Chemistry" },
    { id: "biology", label: "Biology" },
    { id: "maths", label: "Mathematics" },
    { id: "english", label: "English" },
    { id: "cs-it", label: "CS/IT" },
  ],
  "12-science": [
    { id: "physics", label: "Physics" },
    { id: "chemistry", label: "Chemistry" },
    { id: "biology", label: "Biology" },
    { id: "maths", label: "Mathematics" },
    { id: "english", label: "English" },
    { id: "cs-it", label: "CS/IT" },
  ],
  "11-commerce": [
    { id: "accounts", label: "Accountancy" },
    { id: "business", label: "Business Studies" },
    { id: "economics", label: "Economics" },
    { id: "maths", label: "Mathematics" },
    { id: "english", label: "English" },
  ],
  "12-commerce": [
    { id: "accounts", label: "Accountancy" },
    { id: "business", label: "Business Studies" },
    { id: "economics", label: "Economics" },
    { id: "maths", label: "Mathematics" },
    { id: "english", label: "English" },
  ],
  "11-cs-ip": [
    { id: "cs", label: "Computer Science" },
    { id: "ip", label: "Informatics Practices" },
    { id: "webdev", label: "Web Development" },
    { id: "maths", label: "Mathematics" },
    { id: "physics", label: "Physics" },
    { id: "chemistry", label: "Chemistry" },
    { id: "english", label: "English" },
  ],
  "12-cs-ip": [
    { id: "cs", label: "Computer Science" },
    { id: "ip", label: "Informatics Practices" },
    { id: "webdev", label: "Web Development" },
    { id: "maths", label: "Mathematics" },
    { id: "physics", label: "Physics" },
    { id: "chemistry", label: "Chemistry" },
    { id: "english", label: "English" },
  ],
};

// Update subjects when class changes
document.getElementById("class").addEventListener("change", function () {
  const classValue = this.value;
  const subjectContainer = document.getElementById("subject-options");

  // Clear previous subjects
  subjectContainer.innerHTML = "";

  if (classValue && subjectOptions[classValue]) {
    // Add new subject checkboxes
    subjectOptions[classValue].forEach((subject) => {
      const subjectDiv = document.createElement("div");
      subjectDiv.className = "subject-option";
      subjectDiv.innerHTML = `
        <input type="checkbox" id="${subject.id}" name="subjects" value="${subject.label}" />
        <label for="${subject.id}">${subject.label}</label>
      `;
      subjectContainer.appendChild(subjectDiv);
    });

    // Auto-select all subjects
    document.querySelectorAll('input[name="subjects"]').forEach((checkbox) => {
      checkbox.checked = true;
    });
  }
});

// Form validation
whatsappForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();

  let isValid = true;

  // Get form values
  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const classSelect = document.getElementById("class");
  const classValue = classSelect.value;
  const className = classSelect.options[classSelect.selectedIndex]?.text || "";
  const joiningDate = document.getElementById("joining-date").value;

  // Validate name
  if (!name) {
    showError("name-error", "Please enter your full name");
    isValid = false;
  } else if (name.length < 3) {
    showError("name-error", "Name should be at least 3 characters");
    isValid = false;
  }

  // Validate mobile
  const mobileRegex = /^[0-9]{10}$/;
  if (!mobile) {
    showError("mobile-error", "Please enter your mobile number");
    isValid = false;
  } else if (!mobileRegex.test(mobile.replace(/\D/g, ""))) {
    showError("mobile-error", "Please enter a valid 10-digit mobile number");
    isValid = false;
  }

  // Validate class
  if (!classValue) {
    showError("class-error", "Please select your class");
    isValid = false;
  }

  // Validate subjects
  const subjectCheckboxes = document.querySelectorAll('input[name="subjects"]:checked');
  if (subjectCheckboxes.length === 0) {
    showError("subjects-error", "Please select at least one subject");
    isValid = false;
  }

  // Validate joining date
  if (!joiningDate) {
    showError("date-error", "Please select your preferred joining date");
    isValid = false;
  } else {
    const selectedDate = new Date(joiningDate);
    const minDate = new Date("2025-04-01");
    if (selectedDate < minDate) {
      showError("date-error", "Joining date must be April 1, 2025 or later");
      isValid = false;
    }
  }

  if (!isValid) {
    showToast("Please correct the errors in the form", "error");
    return;
  }

  // Get selected subjects
  const subjects = Array.from(subjectCheckboxes)
    .map((cb) => cb.value)
    .join(", ");

  // Prepare WhatsApp message
  const message = `*GC Institute Registration*
--------------------------
*Name:* ${name}
*Mobile:* ${mobile}
*Class:* ${className}
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
      <i class="fas fa-check-circle"></i>
    </div>
    <h3 class="text-lg font-bold text-center">Registration Successful!</h3>
    <p class="text-center mt-2">Redirecting you to WhatsApp...</p>
  `;

  const formContent = document.querySelector(".popup-body");
  formContent.innerHTML = "";
  formContent.appendChild(successMessage);

  showToast("Registration successful! Opening WhatsApp...", "success");

  setTimeout(() => {
    window.open(whatsappURL, "_blank");
    setTimeout(() => {
      popupOverlay.classList.remove("active");
      formContent.innerHTML = "";
      formContent.appendChild(whatsappForm);
      whatsappForm.reset();
      document.getElementById("subject-options").innerHTML = "";
    }, 500);
  }, 2000);
});

// Helper functions
function showError(id, message) {
  const errorElement = document.getElementById(id);
  errorElement.textContent = message;
  errorElement.style.display = "block";

  // Also highlight the input
  const inputId = id.replace("-error", "");
  const inputElement = document.getElementById(inputId);
  if (inputElement) {
    inputElement.classList.add("error");
  }
}

function clearErrors() {
  // Clear all error messages
  document.querySelectorAll(".error-message").forEach((el) => {
    el.textContent = "";
    el.style.display = "none";
  });

  // Remove error highlighting
  document.querySelectorAll(".form-control, select").forEach((el) => {
    el.classList.remove("error");
  });
}

function showToast(message, type) {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
    </div>
    <div class="toast-message">${message}</div>
  `;

  const toastContainer = document.getElementById("toast-container");
  toastContainer.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

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

// Touch support for mobile devices
function addTouchSupport() {
  let touchStartX, touchStartY, touchEndX, touchEndY;

  card.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    },
    false
  );

  card.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    },
    false
  );

  function handleSwipe() {
    const xDiff = touchStartX - touchEndX;
    const yDiff = touchStartY - touchEndY;

    if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 50) {
      if (xDiff > 0) {
        // Swiped left
        cardInner.classList.add("flipped");
      } else {
        // Swiped right
        cardInner.classList.remove("flipped");
      }
    }
  }
}

// Initialize touch support
addTouchSupport();

// Preload any necessary resources or initialize other features
document.addEventListener("DOMContentLoaded", () => {
  // Set min date for joining date input
  document.getElementById("joining-date").min = "2025-04-01";

  // Preload teacher images
  document.querySelectorAll(".teacher-image img").forEach((img) => {
    img.addEventListener("error", function () {
      this.src = "/api/placeholder/120/120";
    });
  });
});
