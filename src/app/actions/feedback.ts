import axios from "axios";

export async function postFeedback(
  prUrl: string,
  feedback: string
): Promise<void> {
  const commentUrl = `${prUrl}/comments`;
  const body = `CodeFox Review:\n${feedback}`;
  try {
    const { data } = await axios.post(
      commentUrl,
      { body },
      { headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` } }
    );

    console.log("Feedback posted:", data);
    return data;
  } catch (error) {
    console.error("Failed to post feedback:",error);
  }
}
