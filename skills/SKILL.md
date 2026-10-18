---
name: adeel-rida-home
description: "Generate immersive, realistic stories and roleplays set in Adeel and Rida's two-floor house. Use when the user asks for stories, scenes, dialogues, or roleplays involving Adeel (19), Rida (18), their cousin living situation, top-floor rooms, shared bathroom, or downstairs parents and kitchen."
type: workflow
lifecycle: active
---

# Adeel & Rida Home — Immersive Household Stories

Generate detailed, consistent stories and roleplays set in the two-floor house where Adeel (19) and his cousin Rida (18) live on the top floor with rooms next to each other, while their parents live downstairs.

## When to Use

Trigger on requests for:
- Stories or scenes about Adeel and Rida at home
- Roleplays or dialogues between them
- Daily life moments, tension, closeness, or family dynamics in the house
- Any narrative involving their living arrangement, privacy, shared spaces, or late nights

Do **not** trigger for general cousin advice, unrelated household questions, or stories about other people.

## Core Generation Rules

1. **Always stay consistent** with the house layout and character ages. See `references/house-layout.md` and `references/characters.md`.
2. **Match the requested tone**. Support everyday slice-of-life, light romantic/flirty tension, family drama, or mixed. Default to natural and grounded if unspecified.
3. **Make it immersive and high-detail**:
   - Use sensory details (sounds through the wall, footsteps on stairs, kitchen smells drifting up, bathroom door clicks, dim lighting at night).
   - Write realistic dialogue with natural Pakistani/English code-switching if it fits the moment.
   - Show the spatial reality: rooms are close, bathroom is shared upstairs, parents are always potentially nearby downstairs.
4. **Respect the living situation**:
   - Privacy is limited. Voices carry. Parents can come upstairs or hear activity.
   - Shared bathroom means timing and awkwardness are common.
   - Kitchen and main living area are downstairs — any meal or late snack involves crossing the parents' space.
5. **Invent fitting extras** when needed (specific furniture, study habits, music tastes, small rituals) but keep them realistic for two young adults living with parents in a typical Pakistani house.
6. **Output format**:
   - For short scenes: Write in second-person ("You...") if the user is roleplaying as Adeel, or third-person narrative.
   - For longer stories: Use clear scene breaks.
   - Offer to continue or adjust tone when the scene feels complete.

## Story Types

| Type | Focus | Common Elements |
|------|--------|-----------------|
| Everyday | Daily routines, small interactions | Borrowing chargers, hearing each other study, bathroom queue, late-night kitchen runs |
| Romantic / Flirty | Soft tension, closeness, crush energy | Quiet talks at doorways, accidental touches, sharing earphones, lingering looks when parents aren't around |
| Family Drama | Parents' presence, rules, secrecy | Hearing parents downstairs, rushing to look normal, conversations cut short, navigating expectations |
| Mixed | Any combination | Natural blend based on the user's prompt |

## Workflow

1. Identify the requested tone and length from the user's message.
2. Load relevant reference files if details are needed:
   - `references/house-layout.md` for spatial accuracy
   - `references/characters.md` for personality and habits
3. Generate the scene with strong sensory and spatial grounding.
4. End with a natural pause or ask if the user wants to continue the roleplay.

## References

- House layout and spatial rules: `references/house-layout.md`
- Character profiles and invented details: `references/characters.md`
- Example scene patterns: `references/scene-examples.md`

Keep stories grounded, emotionally aware, and respectful of the real living arrangement unless the user explicitly asks for a different style.