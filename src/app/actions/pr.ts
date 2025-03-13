import axios from "axios";
import { analyzeDiff, generateLogicalFlow } from "./ai"; // AI-based logical flow generation
import { postFeedback } from "./feedback";

export async function processPR(prUrl: string): Promise<void> {
  try {
    // Fetch PR diff
    console.log("Processing PR:", prUrl);
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
    console.error("PR processing failed:", "Error:", error);
  }
}

function parseDiff(diff: string): { file: string; type: "add" | "remove"; line: string }[] {
  const changes: { file: string; type: "add" | "remove"; line: string }[] = [];
  let currentFile: string | null = null;

  const lines = diff.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect file changes
    if (line.startsWith("diff --git")) {
      const match = line.match(/b\/(.+)/); // Improved to handle any filename
      if (match) {
        currentFile = match[1].trim();
      }
    }

    // Detect added lines (ignoring file metadata changes)
    else if (line.startsWith("+") && !line.startsWith("+++")) {
      if (currentFile) {
        const addedLine = line.slice(1).trim();
        if (addedLine.length > 0) {
          changes.push({ file: currentFile, type: "add", line: addedLine });
        }
      }
    }

    // Detect removed lines (ignoring file metadata changes)
    else if (line.startsWith("-") && !line.startsWith("---")) {
      if (currentFile) {
        const removedLine = line.slice(1).trim();
        if (removedLine.length > 0) {
          changes.push({ file: currentFile, type: "remove", line: removedLine });
        }
      }
    }
  }

  return changes;
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
