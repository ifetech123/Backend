document.getElementById("userForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = {
    firstName: document.querySelector("input[name='firstName']").value,
    lastName: document.querySelector("input[name='lastName']").value,
    age: document.querySelector("input[name='age']").value,
    email: document.querySelector("input[name='email']").value,
    password: document.querySelector("input[name='password']").value,
    phone: document.querySelector("input[name='phone']").value,
    address: document.querySelector("input[name='address']").value,
  };

  try {
    const response = await fetch("https://backend-fd0t.onrender.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    document.getElementById("message").textContent = result.message || "Success!";
  } catch (err) {
    document.getElementById("message").textContent = "Error submitting form.";
  }
});
