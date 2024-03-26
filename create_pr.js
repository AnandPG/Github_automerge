const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // GitHub token provided by GitHub Actions
});

async function createPullRequest() {
  try {
    const prResponse = await octokit.pulls.create({
      owner: process.env.GITHUB_REPOSITORY.split("/")[0],
      repo: process.env.GITHUB_REPOSITORY.split("/")[1],
      title: "Merge changes from release into develop",
      head: "pr-from-release",
      base: "develop",
    });

    console.log("Pull request created:", prResponse.data.html_url);
  } catch (error) {
    console.error("Error creating pull request:", error.message);
    process.exit(1);
  }
}

createPullRequest();
