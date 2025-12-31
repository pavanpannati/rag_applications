const BASE_URL = "https://pannatipavan-docchatai.hf.space";

export async function uploadDocuments(files) {
  const formData = new FormData();
  files.forEach(file => formData.append("files", file));

  const response = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  return response.json();
}

export async function askQuestion(question) {
  const formData = new FormData();
  formData.append("question", question);

  const response = await fetch(`${BASE_URL}/ask`, {
    method: "POST",
    body: formData,
  });

  return response.json();
}
