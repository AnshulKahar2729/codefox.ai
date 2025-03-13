import { generateAIContent, generateCodeReviewPrompt } from "@/lib/gemini";

export async function analyzeDiff(
  changes: { file: string; type: string; line: string }[]
): Promise<string> {
  const prompt = generateCodeReviewPrompt(changes);
  return await generateAIContent(prompt);
}


/* function generateSystemPrompt(
  changes: { file: string; type: string; line: string }[]
): string {
  let prompt = `You are a highly experienced code reviewer and software architect. Analyze the following code changes provided from a GitHub Pull Request and generate a detailed summary. Your analysis should include:
  
- A concise summary of what the changes do.
- The potential impact and benefits of these changes.
- Any suggestions for improvements or potential issues.

Below are the code changes:\n\n`;

  changes.forEach((change) => {
    prompt += `File: ${change.file}\n`;
    prompt += `Change Type: ${
      change.type === "add" ? "Addition" : "Removal"
    }\n`;
    prompt += `Code: ${change.line}\n\n`;
  });

  prompt += `\nPlease provide your detailed analysis in clear and technical language.`;

  return prompt;
}
 */
export async function generateLogicalFlow(
  changes: { file: string; type: "add" | "remove"; line: string }[]
): Promise<string> {
  if (changes.length === 0) {
    return "graph TD;\n  NoChanges[No significant logical changes in this PR];";
  }

  // Summarize meaningful changes (adds/removes, renamed functions, constants, etc.)
  const changeSummary = changes
    .map((change) => {
      if (change.type === "add")
        return `Added in ${change.file}: ${change.line}`;
      if (change.type === "remove")
        return `Removed from ${change.file}: ${change.line}`;
      return "";
    })
    .filter(Boolean)
    .join("\n");

  // AI generates logical steps from the summarized changes
  const logicalSteps = await analyzeDiff([
    { file: "summary", type: "query", line: changeSummary },
  ]);

  // Convert AI's logical analysis into a Mermaid flowchart
  let diagram = "graph TD;\n";
  diagram += `  A[PR Opened] --> B[Changes Analyzed by AI];\n`;

  // Split AI-generated summary into logical steps
  const logicalStepsList = logicalSteps.split("\n").filter(Boolean);
  if (logicalStepsList.length === 0) {
    diagram += `  B --> S0[No major logical changes detected];\n`;
  } else {
    logicalStepsList.forEach((step, index) => {
      diagram += `  B --> S${index}[${step}];\n`;
    });
  }

  return diagram;
}
