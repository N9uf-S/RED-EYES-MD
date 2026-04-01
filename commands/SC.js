import { fetchRepoStats, MESSAGES } from '../france/index.js';

export const commands = [
  {
    name: 'repo',
    aliases: ['sc', 'script'],
    description: 'Sends the official GitHub repository and stats for RED EYES-MD',
    execute: async ({ sock, from, config }) => {
      const botName = config.BOT_NAME || 'RED EYES-MD';
      const botVersion = config.BOT_VERSION || '1.0.0';
      const repoUrl = 'https://github.com/N9uf-S/RED-EYES-MD';

      try {
        const { stars, forks, watchers, created, lastUpdated } = await fetchRepoStats();

        const repoInfo = MESSAGES.repo.info
          .replace('{botName}', botName.toUpperCase())
          .replace('{botVersion}', botVersion)
          .replace('{repoUrl}', repoUrl)
          .replace('{stars}', stars.toLocaleString())
          .replace('{forks}', forks.toLocaleString())
          .replace('{watchers}', watchers.toLocaleString())
          .replace('{created}', created)
          .replace('{lastUpdated}', lastUpdated)
          .replace('{botNameLower}', botName)
          .replace('{botVersionLower}', botVersion);

        await sock.sendMessage(from, { text: repoInfo });

      } catch (error) {
        console.error('GitHub Repo Error:', error.message);
        await sock.sendMessage(from, {
          text: MESSAGES.repo.error.replace('{botName}', botName).replace('{botVersion}', botVersion)
        });
      }
    }
  }
];
