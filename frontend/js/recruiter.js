const API_URL = "https://candidate-shortlisting-system.onrender.com/api";
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const tableBody = document.getElementById("candidateTableBody");
const candidateForm = document.getElementById("candidateForm");
const message = document.getElementById("message");

if (!token || role !== "RECRUITER") {
  window.location.href = "./login.html";
}

const logout = () => {
  localStorage.clear();
  window.location.href = "./login.html";
};

const fetchCandidates = async () => {
  const res = await fetch(`${API_URL}/candidates`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const candidates = await res.json();
  tableBody.innerHTML = "";

  candidates.forEach((candidate) => {
    let actionButton = "No action";

    if (candidate.status === "APPLIED") {
      actionButton = `<button onclick="updateStatus('${candidate._id}', 'SHORTLISTED')">Shortlist</button>`;
    } else if (candidate.status === "SHORTLISTED") {
      actionButton = `<button onclick="updateStatus('${candidate._id}', 'REJECTED')">Reject</button>`;
    }

    tableBody.innerHTML += `
      <tr>
        <td>${candidate.name}</td>
        <td>${candidate.email}</td>
        <td>${candidate.phone}</td>
        <td>${candidate.skills.join(", ")}</td>
        <td>${candidate.experience}</td>
        <td>${candidate.status}</td>
        <td>${actionButton}</td>
      </tr>
    `;
  });
};

candidateForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const candidateData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    skills: document.getElementById("skills").value
      ? document.getElementById("skills").value.split(",").map(skill => skill.trim())
      : [],
    experience: document.getElementById("experience").value
  };

  const res = await fetch(`${API_URL}/candidates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(candidateData)
  });

  const data = await res.json();

  if (res.ok) {
    message.textContent = "Candidate added successfully";
    candidateForm.reset();
    fetchCandidates();
  } else {
    message.textContent = data.message || "Failed to add candidate";
  }
});

const updateStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/candidates/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });

  const data = await res.json();
  message.textContent = data.message || `Status updated to ${status}`;
  fetchCandidates();
};

fetchCandidates();