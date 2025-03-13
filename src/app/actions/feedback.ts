import axios from "axios";

export async function postFeedback(
  prUrl: string,
  feedback: string
): Promise<void> {
  const body = `CodeFox Review:\n${feedback}`;
  // pr url - https://api.github.com/repos/AnshulKahar2729/ai-pull-request/pulls/9
  // const url = `https://api.github.com/repos/${owner}/${repo}/issues/${prNumber}/comments`;

  const user = prUrl.split("/")[4];
  const repo = prUrl.split("/")[5];
  const prNumber = prUrl.split("/")[7];

  const commentUrl = `https://api.github.com/repos/${user}/${repo}/issues/${prNumber}/comments`;
  try {
    const { data } = await axios.post(
      commentUrl,
      { body },
      { headers: { Authorization: `${process.env.GITHUB_TOKEN}` } }
    );

    console.log("Feedback posted:", data);
    return data;
  } catch (error) {
    console.error("Failed to post feedback:", error);
  }
}
