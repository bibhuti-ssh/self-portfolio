import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const content = `# Bibhuti Jha

> Engineer, builder, reader. Personal portfolio and project showcase.

## Projects
- [DroidRun Cloud](/projects/droidrun-cloud): Cloud platform for AI-powered mobile device automation
- [Terminal Portfolio](/projects/terminal-portfolio): This website — SvelteKit, monochrome, dual human/agent mode

## Writing
- [Wordings](/wordings): Thoughts, observations, and things I needed to write down

## About
- [About](/about): Background, skills, and how I think about building

## Optional
- [Reading](/readings): Book reviews and article notes
- [Timeline](/timeline): Life experiences and career journey
- [Achievements](/achievements): Notable milestones
`;

	return new Response(content, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8'
		}
	});
};
