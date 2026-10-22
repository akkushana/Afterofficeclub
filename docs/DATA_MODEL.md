# Data model

The intended production model includes roles, role sections, speakers, sessions, RSVPs, questions, recordings, knowledge items, resources, opportunities, submissions, feedback, reports and audit logs. Every public record needs publication state, timestamps and evidence/provenance metadata. Private attendee and submission data must never be returned by public queries.

The current demo uses typed `Role` and `KnowledgeItem` values in `src/lib/content.ts`; there are no persisted records.
