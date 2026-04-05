const API_URL = "https://candidate-shortlisting-system.onrender.com/api";
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const tableBody = document.getElementById("candidateTableBody");

if (!token || role !== "HR") {
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
  alert(data.message || `Status updated to ${status}`);
  fetchCandidates();
};

fetchCandidates();