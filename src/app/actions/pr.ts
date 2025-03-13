import axios from "axios";
import { analyzeDiff, generateLogicalFlow } from "./ai"; // AI-based logical flow generation
import { postFeedback } from "./feedback";

export async function processPR(prUrl: string): Promise<void> {
  try {
    // Fetch PR diff
    const diffResponse = await axios.get(`${prUrl}.diff`, {
      headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
    });
    console.log("Diff response:", diffResponse.status, diffResponse.statusText);
    const diff = diffResponse.data;
    console.log("Diff:", diff);

    // Parse diff changes
    const changes = parseDiff(diff);
    console.log("Changes:", changes);
    if (changes.length === 0) {
      await postFeedback(prUrl, "No significant changes detected in this PR.");
      return;
    }

    // AI analysis for PR
    const feedback = await analyzeDiff(changes);
    console.log("Feedback:", feedback);

    // Generate Mermaid diagrams
    const changeFlowchart = generateChangeFlowchart(changes);
    console.log("Change Flowchart:", changeFlowchart);
    const logicalFlowchart = await generateLogicalFlow(changes); // AI-based logical diagram
    console.log("Logical Flowchart:", logicalFlowchart);

    // Post feedback with AI analysis & diagrams
    await postFeedback(
      prUrl,
      `### PR Analysis\n\n${feedback}\n\n### Change Flowchart\n\`\`\`mermaid\n${changeFlowchart}\n\`\`\`\n\n### Logical Flow\n\`\`\`mermaid\n${logicalFlowchart}\n\`\`\``
    );
  } catch (error) {
    console.error(
      "PR processing failed:",
      "Error:",
      JSON.stringify(error, null, 2)
    );
  }
}

function parseDiff(
  diff: string
): { file: string; type: "add" | "remove"; line: string }[] {
  const changes: { file: string; type: "add" | "remove"; line: string }[] = [];
  let currentFile = "";

  diff.split("\n").forEach((line) => {
    // Detect file name
    if (line.startsWith("diff --git")) {
      const match = line.match(/b\/([^\s]+)/); // Extracts correct file path
      if (match) {
        currentFile = match[1]; // Store file name
      }
    }
    // Handle added lines
    else if (line.startsWith("+") && !line.startsWith("+++")) {
      if (currentFile) {
        changes.push({
          file: currentFile,
          type: "add",
          line: line.slice(1).trim(),
        });
      }
    }
    // Handle removed lines
    else if (line.startsWith("-") && !line.startsWith("---")) {
      if (currentFile) {
        changes.push({
          file: currentFile,
          type: "remove",
          line: line.slice(1).trim(),
        });
      }
    }
  });

  return changes.filter((change) => change.line.length > 0); // Remove empty lines
}

// Generates a Change Flowchart using Mermaid
function generateChangeFlowchart(
  changes: { file: string; type: "add" | "remove"; line: string }[]
): string {
  let diagram = "graph TD;\n";
  const fileChanges: Record<string, { adds: number; removes: number }> = {};

  changes.forEach((change) => {
    if (!fileChanges[change.file]) {
      fileChanges[change.file] = { adds: 0, removes: 0 };
    }
    if (change.type === "add") fileChanges[change.file].adds++;
    if (change.type === "remove") fileChanges[change.file].removes++;
  });

  Object.entries(fileChanges).forEach(([file, { adds, removes }]) => {
    diagram += `  ${file}["${file}"] -->|Added: ${adds}, Removed: ${removes}| Changes;\n`;
  });

  return diagram;
}

// Handles @CodeFox mentions and AI responses
export async function handleComment(payload: any): Promise<void> {
  const comment = payload.comment.body;
  const query = comment.split("@CodeFox")[1]?.trim();
  const prUrl = payload.issue.url;

  if (!query) {
    await postFeedback(prUrl, "No valid query found after @CodeFox mention.");
    return;
  }

  const response = await analyzeDiff([
    { file: "query", type: "query", line: query },
  ]);
  await postFeedback(prUrl, `Response to "@CodeFox ${query}":\n${response}`);
}
