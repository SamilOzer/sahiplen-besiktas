# AGENTS.md

## 1. PROJECT IDENTITY

Project: Beşiktaş Belediyesi Hayvan Sağlığı ve Sahiplendirme Web Platformu

Organization: Beşiktaş Belediyesi

This project is a municipal digital platform focused on companion animals, animal adoption, lost animals, public information, and animal-related municipal services.

The project must feel like a modern, premium, trustworthy municipal digital product — not a generic municipality website, NGO template, pet shop, veterinary clinic, or childish animal website.

The website is both a functional public-service platform and a high-quality digital experience.

---

## 2. PRIMARY OBJECTIVES

The website has three primary objectives:

1. Make animal adoption easy, attractive, and accessible.
2. Help citizens find and report lost animals efficiently.
3. Present Beşiktaş Municipality's animal-related services and work through a trustworthy, modern digital experience.

The website must prioritize real-world usability.

The visual experience should create a strong emotional connection with animals without becoming sentimental, childish, or visually manipulative.

---

## 3. PROJECT PRIORITIES

Prioritize work in this order:

1. Functional correctness
2. User experience
3. Accessibility
4. Responsive behavior
5. Performance
6. Content clarity
7. Visual quality
8. Advanced animation and 3D effects

Never sacrifice usability, accessibility, performance, or clarity merely to create a visual effect.

The homepage may be highly experimental and cinematic.

Other pages should remain primarily functional, fast, clear, and easy to navigate.

---

## 4. WEBSITE INFORMATION ARCHITECTURE

The initial website structure is:

- Home
- Adoption
- Lost Animals
- About
- Academy
- Contact
- Privacy Policy

Future pages may include:

- Animal Detail
- Lost Animal Detail
- Volunteer
- Support / Donate
- Adoption Application
- Report Lost Animal

Do not add major pages without a clear product or UX reason.

---

## 5. HOMEPAGE

The homepage is the primary visual showcase of the project.

It should feel:

- cinematic
- premium
- modern
- sophisticated
- emotional without being melodramatic
- technological without feeling cold
- trustworthy
- alive
- memorable

The desired experience is:

"The user is not simply scrolling through a website. They are moving through a visual story."

Potential interaction techniques include:

- scroll-driven animation
- sticky sections
- parallax
- cinematic transitions
- 3D animal models
- camera movement
- 3D model rotation
- text reveal
- typography animation
- section-to-section transitions
- micro-interactions
- WebGL
- responsive motion

However:

Animation must support storytelling and navigation.

Do not add animation merely because it is technically possible.

Avoid excessive motion, visual fatigue, motion sickness, and unnecessary GPU usage.

The homepage should gracefully degrade on low-powered devices and mobile devices.

---

## 6. ADOPTION PAGE

The Adoption page is one of the most important functional pages.

It should present animals as meaningful individuals, not merely as database records.

Each animal should be able to display:

- high-quality image
- name
- species
- age
- gender
- short personality description
- adoption status
- education/training information
- detail page
- contact or adoption CTA

Filtering should support at minimum:

- Cat / Dog
- Age
- Gender
- Adoption status

The architecture should be designed so additional filters can be added later without rewriting the entire page.

Animal cards should feel premium and editorial rather than like generic e-commerce cards.

The animal detail experience should communicate:

- personality
- history
- current condition where appropriate
- training or education
- adoption information
- clear next action

Do not invent factual animal information.

Use structured mock data only when real data is unavailable.

Clearly separate mock/demo data from future production data.

---

## 7. LOST ANIMALS PAGE

The Lost Animals page is a high-priority functional feature.

Its primary objective is speed and discoverability.

Users should be able to quickly:

- search
- filter
- identify
- inspect
- contact

a relevant lost-animal listing.

Each listing may contain:

- large image
- animal name
- species
- gender
- date lost
- location lost
- distinguishing characteristics
- contact information or contact CTA
- listing status

Filtering/search should support:

- keyword
- date
- location
- species
- cat/dog distinction

Avoid unnecessary interaction steps.

The user should reach the relevant listing as quickly as possible.

Do not bury critical information behind excessive animations or visual effects.

---

## 8. ABOUT PAGE

The About page should establish trust.

It should communicate:

- Beşiktaş Municipality's role
- relevant animal-related work
- mission
- services
- public value
- responsible and transparent communication

Tone:

- professional
- human
- clear
- trustworthy

Avoid exaggerated marketing language.

---

## 9. ACADEMY PAGE

The Academy should not feel like a generic blog.

It should function as an accessible knowledge center.

Potential content categories:

- responsible pet ownership
- adoption guidance
- animal care
- vaccination information
- sterilization information
- animal behavior
- lost animal prevention
- what to do when finding a lost animal
- municipal services
- frequently asked questions

Content architecture should be scalable.

Use clear categories, search, and readable article layouts where appropriate.

---

## 10. CONTACT PAGE

The Contact page must prioritize usability.

Provide clear access to:

- municipality/department contact information
- relevant phone information
- email where applicable
- location information where applicable
- contact form where appropriate

Do not hide essential contact information behind unnecessary UI interactions.

---

## 11. PRIVACY

The Privacy Policy page must be treated as a functional legal-information page.

Do not apply excessive animations or experimental interaction patterns to legal content.

Text must remain highly readable and accessible.

---

## 12. DESIGN LANGUAGE

The visual language must avoid:

- childish aesthetics
- excessive "cute" styling
- generic NGO design
- generic municipality templates
- excessive paw-print icons
- cliché pet illustrations
- overly saturated playful palettes
- stock-photo visual language
- excessive rounded-card layouts
- unnecessary gradients
- decorative effects without purpose

The website should feel closer to:

premium editorial digital design
+
modern public service
+
cinematic interactive storytelling

than to:

traditional municipality website
+
animal shelter template.

---

## 13. UI/UX PRO MAX SKILL

The UI/UX Pro Max skill is installed globally and must be used as a design intelligence reference.

Before making major visual decisions, consult the skill when relevant.

Use it for:

- visual style exploration
- typography
- color systems
- layout decisions
- UI patterns
- UX guidelines
- accessibility considerations
- responsive design
- component patterns
- interaction patterns
- avoiding common design anti-patterns

Do not blindly follow the skill.

Project-specific requirements always take priority.

If a recommendation from the skill conflicts with accessibility, usability, municipal requirements, performance, or project requirements, prioritize the project requirement.

---

## 14. TECHNOLOGY

Preferred initial stack:

- Next.js
- TypeScript
- React
- React Three Fiber
- Three.js
- GSAP
- GSAP ScrollTrigger

Potential supporting technologies may be introduced only when justified.

Do not add dependencies merely because they are popular.

Before introducing a significant new dependency, evaluate:

- necessity
- bundle impact
- maintenance
- compatibility
- performance
- whether the functionality can be implemented cleanly without it

The final stack may be adjusted if a better technical solution is identified.

When changing the preferred stack, explain why.

---

## 15. 3D

3D is primarily a homepage storytelling technology.

Do not use 3D everywhere.

Potential 3D uses:

- animal models
- hero scenes
- camera movement
- scroll-based storytelling
- transitions
- interactive objects

3D must never make the website unusable.

Consider:

- lazy loading
- compressed GLB/GLTF assets
- texture optimization
- level of detail
- GPU usage
- mobile performance
- reduced-motion preferences
- fallback experiences

If a 3D effect significantly damages performance, simplify or remove it.

---

## 16. ANIMATION

Animation should communicate:

- hierarchy
- transition
- storytelling
- spatial relationships
- interaction feedback

Avoid animation that exists only for decoration.

Respect:

`prefers-reduced-motion`

Users who request reduced motion must receive an accessible alternative.

Animations should not block navigation or content access.

---

## 17. RESPONSIVE DESIGN

The website must be designed for:

- desktop
- laptop
- tablet
- mobile

Do not treat mobile as an afterthought.

The mobile experience may use simplified animation or completely different interaction patterns when necessary.

Do not simply shrink desktop layouts.

For complex 3D scenes, create a deliberate mobile fallback when necessary.

---

## 18. ACCESSIBILITY

Accessibility is mandatory.

Consider:

- semantic HTML
- keyboard navigation
- visible focus states
- sufficient color contrast
- meaningful alt text
- accessible form controls
- ARIA only when necessary
- reduced motion
- readable typography
- screen-reader compatibility

Do not sacrifice accessibility for visual effects.

---

## 19. PERFORMANCE

Performance is a core requirement.

Pay particular attention to:

- JavaScript bundle size
- image optimization
- 3D asset size
- font loading
- unnecessary re-renders
- animation performance
- GPU usage
- lazy loading
- code splitting
- responsive images

Do not load large 3D assets before they are needed.

Do not load unnecessary libraries globally.

---

## 20. SEO

Implement solid technical SEO from the beginning.

Consider:

- semantic HTML
- page titles
- metadata
- descriptions
- Open Graph
- canonical URLs
- structured content
- accessible URLs
- sitemap
- robots configuration where appropriate

Do not treat SEO as a final-week patch.

---

## 21. CONTENT

Do not use:

- Lorem ipsum
- meaningless placeholder copy
- fake statistics presented as facts
- invented municipal information
- invented contact details
- invented animal information

When real content is unavailable, use clearly marked realistic mock content.

Design the system so real municipal data can replace mock data without redesigning the interface.

---

## 22. COMPONENT ARCHITECTURE

Use modular components.

Avoid:

- giant components
- duplicated code
- tightly coupled page-specific logic
- unnecessary abstraction

Prefer:

- reusable UI components
- reusable layout components
- reusable animation components
- reusable data structures
- clear separation between content/data and presentation

Keep components understandable and maintainable.

---

## 23. DATA ARCHITECTURE

Animal data should be structured separately from UI components.

Design the application so animal records can eventually come from:

- API
- CMS
- municipal database
- external service

without requiring a complete frontend rewrite.

Use realistic typed data models.

---

## 24. SECURITY

Never expose secrets in frontend code.

Do not hardcode:

- API keys
- private tokens
- credentials
- private URLs
- sensitive personal information

Use environment variables where appropriate.

Validate user input.

Do not trust client-side data.

---

## 25. CODE QUALITY

Use TypeScript strictly.

Prefer readable code over clever code.

Avoid unnecessary complexity.

Avoid premature abstraction.

Keep functions and components focused.

Use meaningful names.

Do not duplicate logic when a clean reusable solution is obvious.

Do not rewrite working code without a reason.

---

## 26. DEVELOPMENT WORKFLOW

Work incrementally.

Before implementing a major feature:

1. Understand the existing architecture.
2. Identify affected files.
3. Consider UX implications.
4. Consider responsive behavior.
5. Consider accessibility.
6. Consider performance.
7. Implement the smallest coherent solution.
8. Test it.
9. Review the result.
10. Only then continue.

Do not make large uncontrolled changes across the project.

---

## 27. ONE-WEEK DELIVERY CONSTRAINT

The project has an aggressive initial delivery target of approximately one week.

Therefore prioritize:

### P0 — Must work

- Home
- Adoption
- Lost Animals
- Navigation
- Responsive behavior
- Core accessibility
- Basic SEO
- Contact
- About
- Academy
- Privacy

### P1 — High visual impact

- cinematic homepage
- scroll-driven animation
- selected 3D experience
- premium typography
- polished transitions
- premium adoption cards

### P2 — Later enhancements

- advanced filters
- advanced search
- sophisticated maps
- advanced CMS integrations
- advanced administration
- additional interaction systems

Never allow a P1 visual experiment to prevent completion of a P0 feature.

---

## 28. DECISION MAKING

The AI coding assistant is expected to act as a senior engineer and design-aware implementation partner.

However, it must not silently make major product decisions.

Ask the project owner before making decisions involving:

- major navigation changes
- removal of important functionality
- major technology changes
- significant visual direction changes
- changing the information architecture
- introducing expensive infrastructure
- removing accessibility features
- substantially reducing the project scope

For minor implementation decisions, use sound engineering judgment and proceed.

---

## 29. PROJECT OWNER

The human project owner is responsible for:

- product vision
- creative direction
- final design decisions
- prioritization
- content approval

The AI coding assistant is responsible for:

- implementation
- technical architecture
- code quality
- performance considerations
- accessibility implementation
- responsive implementation
- identifying technical risks
- proposing practical solutions

The assistant should proactively identify problems and suggest better implementation approaches instead of blindly following instructions.

---

## 30. GENERAL PRINCIPLE

The website should feel like:

"A modern digital public service that happens to be exceptionally beautiful."

It should never feel like:

"A beautiful animation demo that happens to contain municipal information."

Function comes first.

Experience comes second.

Visual spectacle comes third.

But when visual spectacle is appropriate, execute it at a very high level.