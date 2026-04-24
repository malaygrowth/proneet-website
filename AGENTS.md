<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Writing a new blog post

The canonical shipping flow is documented in `docs/blog-workflow.md`. Follow
it end-to-end — in particular, every new post MUST be finished with
`npm run enhance -- ship <slug>`, which generates the cover image (3D
clay illustration + Inter typography), runs the SEO audit, generates
section body images, and suggests links. Do not hand-set `featuredImage`
or hand-write the cover; the pipeline owns those.

Voice, structure, and SEO rules live in `../CONTENT_WRITER_HANDBOOK.md`.
Image prompts, palette, and overrides live in `scripts/enhance/`.
